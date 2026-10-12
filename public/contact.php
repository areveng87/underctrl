<?php
/**
 * UnderControl · formulario de contacto (Hostinger, PHP 8+)
 * Recibe JSON desde la web y lo envía por email.
 * Antes de publicar: crea el buzón TO_EMAIL y FROM_EMAIL en hPanel → Emails.
 */
const TO_EMAIL   = 'info@underctrl.es';
const FROM_EMAIL = 'no-reply@underctrl.es'; // debe existir en el dominio para que no acabe en spam
const SITE       = 'underctrl.es';

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function out(int $code, array $data): never { http_response_code($code); echo json_encode($data); exit; }

if ($_SERVER['REQUEST_METHOD'] !== 'POST') out(405, ['ok' => false, 'error' => 'method']);

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin && !preg_match('#^https://(www\.)?underctrl\.es$#', $origin)) out(403, ['ok' => false, 'error' => 'origin']);

$raw = file_get_contents('php://input', false, null, 0, 20000);
$in = json_decode($raw ?: '', true);
if (!is_array($in)) out(400, ['ok' => false, 'error' => 'payload']);

// Honeypot: los bots rellenan "website"
if (!empty($in['website'])) out(200, ['ok' => true]);

// Límite simple: 1 envío cada 30 s por IP
$ip = $_SERVER['REMOTE_ADDR'] ?? '0';
$lock = sys_get_temp_dir() . '/uc_contact_' . md5($ip);
if (is_file($lock) && time() - filemtime($lock) < 30) out(429, ['ok' => false, 'error' => 'rate']);
@touch($lock);

$clean = fn($v, $max) => trim(mb_substr(str_replace(["\r", "\0"], '', (string)($v ?? '')), 0, $max));
$name    = $clean($in['name'] ?? '', 120);
$email   = $clean($in['email'] ?? '', 160);
$profile = $clean($in['profile'] ?? '', 40);
$company = $clean($in['company'] ?? '', 160);
$message = $clean($in['message'] ?? '', 4000);
$consent = !empty($in['consent']);
$langs   = ['es' => 'Español', 'en' => 'English', 'pt' => 'Português', 'ca' => 'Català'];
$lang    = $langs[$in['lang'] ?? 'es'] ?? 'Español';

if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || !$consent) out(422, ['ok' => false, 'error' => 'validation']);
$name = str_replace("\n", ' ', $name);

$profiles = ['particular' => 'Particular', 'autonomo' => 'Autónomo/a', 'empresa' => 'Pyme', 'gestoria' => 'Gestoría o asesoría', 'otro' => 'Otro'];
$profileLabel = $profiles[$profile] ?? 'Otro';

$body  = "Nueva solicitud desde " . SITE . "\n\n";
$body .= "Nombre:  $name\nEmail:   $email\nPerfil:  $profileLabel\nIdioma:  $lang\n";
if ($company !== '') $body .= "Empresa: $company\n";
$body .= "\nMensaje:\n" . ($message !== '' ? $message : '(sin mensaje)') . "\n\n";
$body .= "---\nConsentimiento RGPD: sí · " . date('d/m/Y H:i') . " · IP $ip\n";

$subject = '=?UTF-8?B?' . base64_encode("[UnderControl] Solicitud de $name ($profileLabel)") . '?=';
$headers = implode("\r\n", [
  'From: UnderControl <' . FROM_EMAIL . '>',
  'Reply-To: ' . $email,
  'MIME-Version: 1.0',
  'Content-Type: text/plain; charset=UTF-8',
  'Content-Transfer-Encoding: 8bit',
]);

$sent = @mail(TO_EMAIL, $subject, $body, $headers, '-f' . FROM_EMAIL);
if (!$sent) out(500, ['ok' => false, 'error' => 'mail']);
out(200, ['ok' => true]);
