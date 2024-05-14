<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CustomPagesSeeder extends Seeder
{
    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        DB::table('custom_pages')->delete();
        DB::table('custom_pages')->insert([
            0 => array(
                'id' => 1,
                'title' => 'Example Privacy Policy',
                'body' => '<p>Welcome to BeMusic ("us", "we", or "our"). At http://localhost, we value your privacy and strive to protect your personal information. This Privacy Policy outlines the types of data we collect, how we use and protect it, and your rights regarding your personal information.</p>
<h2>Information We Collect</h2>
<p>We may collect various types of information from you, including:</p>
<ol>
  <li><strong>Personal Information:</strong> When you register for an account, place an order, subscribe to our newsletter, or interact with our website, we may collect personal information such as your name, email address, postal address, phone number, and payment information.</li>
  <li><strong>Usage Data:</strong> We may automatically collect information about how you use our website, including your IP address, browser type, operating system, referring URLs, access times, and pages viewed.</li>
  <li><strong>Cookies and Tracking Technologies:</strong> We use cookies and similar tracking technologies to enhance your browsing experience and collect data about your interactions with our website.</li>
</ol>
<h2>How We Use Your Information</h2>
<p>We use the collected information for various purposes, including:</p>
<ol>
  <li>Providing and improving our services to you.</li>
  <li>Processing your orders and payments.</li>
  <li>Sending you newsletters and promotional materials.</li>
  <li>Analyzing website usage and trends to enhance user experience.</li>
  <li>Responding to your inquiries and providing customer support.</li>
  <li>Protecting our legal rights and preventing fraud.</li>
</ol>
<h2>Data Sharing and Disclosure</h2>
<p>We may share your personal information with:</p>
<ol>
  <li>Third-party service providers who assist us in operating our website and delivering services to you.</li>
  <li>Legal authorities when required by law or to protect our rights and safety.</li>
</ol>
<p>We do not sell, rent, or trade your personal information to third parties for marketing purposes.</p>
<h2>Your Rights</h2>
<p>You have the right to:</p>
<ol>
  <li>Access, correct, or delete your personal information.</li>
  <li>Withdraw your consent for processing your data.</li>
  <li>Object to processing of your personal data.</li>
  <li>Lodge a complaint with a supervisory authority.</li>
</ol>
<h2>Security</h2>
<p>We take reasonable measures to protect your personal information from unauthorized access, alteration, or disclosure. However, no data transmission over the internet or storage system can be guaranteed to be 100% secure.</p>
<h2>Children\'s Privacy</h2>
<p>Our services are not intended for children under the age of 13. We do not knowingly collect or maintain personal information from children.</p>
<h2>Changes to This Privacy Policy</h2>
<p>We may update our Privacy Policy from time to time. Any changes will be posted on this page, and the "Last updated" date will be revised accordingly.</p>
<h2>Contact Us</h2>
<p>If you have any questions, concerns, or requests regarding your personal information or our Privacy Policy, please contact us at <a href="mailto:"></a>.</p>
',
                'slug' => 'privacy-policy',
                'meta' => NULL,
                'type' => 'default',
                'created_at' => '2024-04-11 19:25:03',
                'updated_at' => '2024-04-11 19:25:03',
                'user_id' => NULL,
                'hide_nav' => 0,
                'workspace_id' => NULL,
            ),
            1 => array(
                'id' => 2,
                'title' => 'Example Terms of Service',
                'body' => '<p>
  Welcome to BeMusic ("us", "we", or "our"). By accessing and using our website, you agree to
  comply with and be bound by the following Terms of Service. Please read these terms carefully
  before using our services.
</p>
<h2>1. Acceptance of Terms</h2>
<p>
  By using our website, you acknowledge that you have read, understood, and agree to abide by these
  Terms of Service. If you do not agree with these terms, please do not use our services.
</p>
<h2>2. Use of Our Services</h2>
<p>
  You may use our website and services only for lawful purposes and in compliance with all
  applicable laws and regulations. You agree not to engage in any activity that may disrupt or
  interfere with the functioning of our website.
</p>
<h2>3. User Accounts</h2>
<p>
  If you create an account on our website, you are responsible for maintaining the confidentiality
  of your account information and password. You agree to notify us immediately of any unauthorized
  use of your account.
</p>
<h2>4. Content</h2>
<p>
  Any content you submit to our website, including text, images, and other materials, must comply
  with our content guidelines. You retain ownership of your content, but you grant us a
  non-exclusive, royalty-free license to use, reproduce, and distribute your content on our
  platform.
</p>
<h2>5. Intellectual Property</h2>
<p>
  Unless otherwise stated, all content and materials on our website are the property of [Website
  Name] and are protected by copyright, trademark, and other intellectual property laws.
</p>
<h2>6. Disclaimer of Warranties</h2>
<p>
  Our website is provided "as is" and "as available" without any warranties of any kind, whether
  express or implied. We do not guarantee the accuracy, completeness, or reliability of any content
  or materials on our website.
</p>
<h2>7. Limitation of Liability</h2>
<p>
  We shall not be liable for any indirect, incidental, special, consequential, or punitive damages
  arising out of or relating to your use of our website.
</p>
<h2>8. Governing Law</h2>
<p>
  These Terms of Service shall be governed by and construed in accordance with the laws of [Your
  Country/State], without regard to its conflict of law principles.
</p>
<h2>9. Changes to Terms</h2>
<p>
  We reserve the right to modify or update these Terms of Service at any time. It is your
  responsibility to review these terms periodically. Your continued use of our website after any
  changes signifies your acceptance of the modified terms.
</p>
<h2>10. Contact Us</h2>
<p>
  If you have any questions or concerns regarding these Terms of Service, please contact us at
  <a href="mailto:"></a>.
</p>
',
                'slug' => 'terms-of-service',
                'meta' => NULL,
                'type' => 'default',
                'created_at' => '2024-04-11 19:25:03',
                'updated_at' => '2024-04-11 19:25:03',
                'user_id' => NULL,
                'hide_nav' => 0,
                'workspace_id' => NULL,
            ),
            2 => array(
                'id' => 3,
                'title' => 'Example About Us',
                'body' => '<p>The standard Lorem Ipsum passage, used since the 1500s
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>

<p>Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"</p>

<p>1914 translation by H. Rackham
    "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"</p>

<p>Section 1.10.33 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."</p>

<p>1914 translation by H. Rackham
    "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."</p>',
                'slug' => 'about-us',
                'meta' => NULL,
                'type' => 'default',
                'created_at' => '2024-04-11 19:25:04',
                'updated_at' => '2024-04-11 19:25:04',
                'user_id' => NULL,
                'hide_nav' => 0,
                'workspace_id' => NULL,
            ),
        ]);
    }
}