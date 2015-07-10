<?php

require 'PHPMailerAutoload.php';

$mail = new PHPMailer;

//CONFIGURANDO EMAIL DE ENVIO

//$mail->isSMTP();                                      // SETA O MAILER PARA USAR O SMTP
$mail->Host = 'mail.planosdesaudedefortaleza.com.br';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'daniel@planosdesaudedefortaleza.com.br';                 // SMTP username
$mail->Password = 'danielsl91';                           // SMTP password
$mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 26;


//CONFIGURANDO CABEÇALHO

$mail->From = 'vendas@hapvidaplanosdesaude.com.br';
$mail->FromName = 'Hapvida planos';
$mail->addAddress('vendas@hapvidaplanosdesaude.com.br', 'Joe User');     // Add a recipient
//$mail->addAddress('ellen@example.com');               // Name is optional
$mail->addReplyTo('nelclassico@gmail.com');
$mail->addCC('daniel.destra@gmail.com');
$mail->addBCC('vendas@hapvidaplanosdesaude.com.br');

//CONFIGURAÇÃO DE ARQUIVOS A SEREM ENVIADOS

$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);


//PEGANDO DADOS DO FORMULÁRIO

//2 - resgatar o nome digitado no formulário e grava na variavel $nome
$nome = $_POST['nome'];
// 3 - resgatar o assunto digitado no formulário e grava na variavel //$tel_fixo
$tel_fixo = $_POST['tel_fixo'];
// 4 - resgatar o assunto digitado no formulário e grava na variavel //$tel_celular
$tel_celular = $_POST['tel_celular'];
// 5 Resgatar o assunto digitado no formulário e grava na variável //$email
$email = $_POST['email'];
//6 – Agora definimos a mensagem que vai ser enviado no e-mail
$planos = $_POST['optradio'];


//CORPO DO EMAIL A SER ENTREGUE
$mensagemHTML = '<P>FORMULARIO PREENCHIDO NO SITE www.hapvidaplanosdesaude.com.br</P>
<p><b>Nome:</b> '.$nome.'
<p><b>E-Mail:</b> '.$email.'
<p><b>Telefone:</b> '.$tel_fixo.'
<p><b>Telefone Celular:</b> '.$tel_celular.'
<p><b>Planos:</b> '.$planos.'</p>
<hr>';


//ENTREGA
$mail->Subject = 'Indicacao';//ASSUNTO
$mail->Body = "<strong>Nome: </strong>".$mensagemHTML; //CORPO DO EMAIL
//$mail->Body ="<br> <strong>Telefone Fixo: </strong>".$tel_fixo;
//$mail->Body ="<br> <strong> Celular: </strong>".$tel_Celular;
//$mail ->Body ="<br> <strong> Email: </strong>".$email;

//7 – agora inserimos as codificações corretas e tudo mais.



//CONFIRMANDO O ENVIO DO FORMULÁRIO POR EMAIL.
  //====================================================
  if (!$mail-> send()){
     $msgerro = "Falha no envio de email.";
    echo "<script>location.href='index.html'; alert('$msgerro');</script>";
    echo 'Mailer Error: ' . $mail->ErrorInfo;
  }
    else{

  echo '<script type="text/javascript">
/* <![CDATA[ */
var google_conversion_id = 1016272209;
var google_conversion_language = "pt";
var google_conversion_format = "1";
var google_conversion_color = "ffffff";
var google_conversion_label = "hMwZCJWerFkQ0arM5AM";
var google_remarketing_only = false;
/* ]]> */
</script>
<script type="text/javascript" src="//www.googleadservices.com/pagead/conversion.js">
</script>
<noscript>
<div style="display:inline;">
<img height="1" width="1" style="border-style:none;" alt="" src="//www.googleadservices.com/pagead/conversion/1016272209/?label=hMwZCJWerFkQ0arM5AM&amp;guid=ON&amp;script=0"/>
</div>
</noscript>';

echo "<script>(function() {
  var _fbq = window._fbq || (window._fbq = []);
  if (!_fbq.loaded) {
    var fbds = document.createElement('script');
    fbds.async = true;
    fbds.src = '//connect.facebook.net/en_US/fbds.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(fbds, s);
    _fbq.loaded = true;
  }
})();
window._fbq = window._fbq || [];
window._fbq.push(['track', '6022876241478', {'value':'0.01','currency':'BRL'}]);
</script>
<noscript><img height=1' width='1' alt='' style='display:none' src='https://www.facebook.com/tr?ev=6022876241478&amp;cd[value]=0.01&amp;cd[currency]=BRL&amp;noscript=1' /></noscript>";
    $msg = "Sua mensagem foi enviada com sucesso.";
    echo "<script>location.href='http://planosdesaudedefortaleza.com.br'; alert('$msg');</script>";

  }
  //====================================================

 ?>
