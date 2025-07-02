<?php
// 1) Import delle classi di PHPMailer (e dei file necessari)
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';


// 2) Controllo che il form sia stato inviato in POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // 3) Recupero dei dati inviati dal form
    $numPersone       = $_POST["numPersone"];
    $dataPrenotazione = $_POST["dataPrenotazione"];
    $oraPrenotazione  = $_POST["oraPrenotazione"];
    $nome             = $_POST["nome"];
    $cognome          = $_POST["cognome"];
    $email            = $_POST["email"];
    $telefono         = $_POST["telefono"];

    // 4) Creazione di un oggetto PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Configurazione SMTP
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';  // Esempio: server SMTP di Gmail
        $mail->SMTPAuth   = true;
        $mail->Username   = 'tuoaccount@gmail.com'; // La tua email
        $mail->Password   = 'tuapassword';          // La password o app password
        $mail->SMTPSecure = 'tls';                  // Oppure 'ssl'
        $mail->Port       = 587;                    // Porta per TLS, 465 per SSL

        // Impostazioni dell'email
        $mail->setFrom('tuoaccount@gmail.com', 'Prenotazioni'); // Da chi viene l'email
        $mail->addAddress('miaemail@xxx.it');                   // Tua email di destinazione
        $mail->addReplyTo($email);                              // Se vuoi rispondere all'utente

        // Contenuto del messaggio
        $mail->isHTML(false); // Se vuoi mandare testo semplice (altrimenti true per HTML)
        $mail->Subject = "Nuova prenotazione da $nome $cognome";
        $mail->Body    = "Numero persone: $numPersone\n"
                       . "Data prenotazione: $dataPrenotazione\n"
                       . "Orario prenotazione: $oraPrenotazione\n"
                       . "Nome: $nome\n"
                       . "Cognome: $cognome\n"
                       . "Email: $email\n"
                       . "Telefono: $telefono\n";

        // Invio dell'email
        $mail->send();
        echo "Email inviata con successo!";
    } catch (Exception $e) {
        echo "Errore invio email: {$mail->ErrorInfo}";}
    }

