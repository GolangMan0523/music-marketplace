<?php

namespace Common\Settings\Mail;

use Symfony\Component\Mailer\SentMessage;
use Symfony\Component\Mailer\Transport\AbstractTransport;

class GmailApiMailTransport extends AbstractTransport
{
    public function doSend(SentMessage $message): void
    {
        (new GmailClient())->sendEmail($message->toString());
    }

    public function __toString(): string
    {
        return 'gmailApi';
    }
}
