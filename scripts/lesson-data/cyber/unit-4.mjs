/* AP Cybersecurity, Units 4–5. */
const R = String.raw;
export const lessons = [
  {
    id: "device-vulnerabilities-and-attacks",
    obj: ["Identify malware types and device vulnerabilities such as unpatched software and weak configurations."],
    terms: [
      ["Malware", "Software designed to harm or gain unauthorized control of a device."],
      ["Ransomware", "Malware that encrypts data and demands payment for the key."],
      ["Zero-day", "A vulnerability unknown to the vendor, with no patch available."],
    ],
    checks: [
      ["How does a worm differ from a virus?", "A worm spreads by itself across networks; a virus needs a host file and user action."],
      ["Why are unpatched systems a major risk?", "Attackers exploit publicly known vulnerabilities that patches would have fixed."],
    ],
    body: R`
| Malware | Behavior |
| --- | --- |
| virus | attaches to files, spreads when they run |
| worm | self-propagates across networks |
| trojan | disguised as legitimate software |
| ransomware | encrypts files, demands payment |
| spyware / keylogger | secretly records activity |
| rootkit | hides deep in the system to keep access |
| botnet agent | lets an attacker control the device remotely |

## Device vulnerabilities

Outdated operating systems and apps, default passwords, unnecessary services, excessive user privileges, disabled security software, and lost or stolen unencrypted devices.
`,
    note: ["Patch quickly", "Many major outbreaks used vulnerabilities that had patches available for months. Patch management is one of the most effective controls."],
    ex: ["Classify the malware", "A free game download secretly installs software that sends the user's keystrokes to a remote server. What two types are involved?", ["It is disguised as something legitimate.", "It records keystrokes."], "a trojan delivering a keylogger (spyware)."],
  },
  {
    id: "authentication",
    obj: ["Compare authentication factors and evaluate password strength."],
    terms: [
      ["Authentication factor", "Something you know, something you have, or something you are."],
      ["Multifactor authentication (MFA)", "Requiring two or more different types of factor."],
      ["Keyspace", "The number of possible passwords: (characters available) raised to the password length."],
    ],
    checks: [
      ["Is a password plus a security question MFA?", "No; both are something you know."],
      ["How many passwords are possible with 8 lowercase letters?", "26⁸, about 2.1 × 10¹¹."],
    ],
    body: R`
| Factor | Examples |
| --- | --- |
| something you know | password, PIN |
| something you have | phone app code, security key, smart card |
| something you are | fingerprint, face |

**MFA** requires factors of different types. Phishing-resistant MFA (security keys, passkeys) is strongest.

## Password strength

$$\text{possible passwords} = c^L$$

where $$c$$ is the number of possible characters and $$L$$ the length. Length matters most: each extra character multiplies the possibilities by $$c$$.

| Character set | c |
| --- | --- |
| digits | 10 |
| lowercase | 26 |
| upper + lower | 52 |
| upper + lower + digits | 62 |
| plus symbols | about 94 |

Passwords should be long, unique for every site, stored in a password manager, and stored by servers only as salted hashes.
`,
    note: ["Attacks on passwords", "Brute force tries everything; dictionary attacks try common words; credential stuffing reuses leaked passwords on other sites; password spraying tries one common password across many accounts."],
    ex: ["Compare passwords", "Which has more possibilities: an 8-character password from 62 characters, or a 12-character password of lowercase letters only?", ["62⁸ ≈ 2.2 × 10¹⁴.", "26¹² ≈ 9.5 × 10¹⁶."], "the 12-character lowercase password, about 400 times more."],
  },
  {
    id: "protecting-devices",
    obj: ["Apply device hardening, least privilege and Linux file permissions."],
    terms: [
      ["Hardening", "Reducing a device's attack surface by removing unneeded services, applying patches and securing settings."],
      ["File permissions", "Read (r), write (w) and execute (x) rights for the owner, group and others."],
      ["chmod", "The Linux command that sets file permissions, often in octal (r = 4, w = 2, x = 1)."],
    ],
    checks: [
      ["What permissions does chmod 640 set?", "Owner rw-, group r--, others ---."],
      ["What octal value gives rwxr-x---?", "750."],
    ],
    body: R`
## Hardening checklist

- Install updates and patches.
- Remove unneeded software and disable unused services and ports.
- Enable host firewall, anti-malware and full-disk encryption.
- Use standard (non-admin) accounts for daily work.
- Lock screens automatically; enable remote wipe for mobile devices.

## Linux permissions

§§§text
-rw-r----- kmurray staff 2048 Sep 18 10:45 report.txt
 owner group others
§§§

Each group of three is converted to a digit: $$r = 4,\ w = 2,\ x = 1$$.

| Symbolic | Octal |
| --- | --- |
| rwx | 7 |
| rw- | 6 |
| r-x | 5 |
| r-- | 4 |
| --- | 0 |

So §rw-r-----§ is 640, set with §chmod 640 report.txt§. Granting §777§ (everyone can do everything) is almost never appropriate.
`,
    note: ["Least privilege for files", "Give each user and group only the access they need. Sensitive files should not be readable by others."],
    ex: ["Set permissions", "A script must be readable, writable and executable by its owner, readable and executable by the group, and inaccessible to others. Which chmod command?", ["Owner rwx = 7, group r-x = 5, others --- = 0."], "chmod 750."],
  },
  {
    id: "detecting-attacks-on-devices",
    obj: ["Analyze authentication logs, process lists and system changes for signs of compromise."],
    terms: [
      ["Brute-force attack", "Repeatedly guessing passwords until one works."],
      ["Privilege escalation", "Gaining higher access rights than authorized, such as root."],
      ["Persistence", "Mechanisms malware uses to survive reboots, such as scheduled tasks or startup entries."],
    ],
    checks: [
      ["What log pattern suggests a successful brute-force attack?", "Many failed logins for an account from one source, followed by a success."],
      ["Name a sign of malware on a device.", "Unknown processes, high CPU, new startup entries, disabled security tools or unexpected outbound connections."],
    ],
    body: R`
## Authentication logs

§§§text
Mar 03 02:14:01 sshd: Failed password for admin from 198.51.100.23
Mar 03 02:14:03 sshd: Failed password for admin from 198.51.100.23
Mar 03 02:14:05 sshd: Failed password for admin from 198.51.100.23
Mar 03 02:14:09 sshd: Accepted password for admin from 198.51.100.23
§§§

Repeated failures from one address followed by success indicate a likely compromised account.

## Other indicators

- Unknown processes or services; programs running from temporary folders.
- New user accounts or added administrator rights.
- Changed file permissions or modified system files.
- Disabled antivirus or logging.
- Unexpected outbound connections.

## Responding

Isolate the device, preserve evidence, reset credentials, remove the threat, patch the vulnerability, and restore from clean backups.
`,
    note: ["Account lockout and alerts", "Locking an account after several failures, plus alerting on success after failures, stops many brute-force attacks."],
    ex: ["Count failures", "An auth log shows 37 failed logins for user 'jlee' from one IP in 2 minutes and no success. What is the likely attack, and has it succeeded?", ["Rapid repeated guesses on one account."], "a brute-force attempt; it has not succeeded, but the IP should be blocked and the account reviewed."],
  },
  {
    id: "application-and-data-vulnerabilities-and-attacks",
    obj: ["Describe attacks on applications and data, including SQL injection, XSS and data breaches."],
    terms: [
      ["SQL injection", "Inserting SQL commands into input so the application's database executes them."],
      ["Cross-site scripting (XSS)", "Injecting malicious script into a web page viewed by other users."],
      ["Input validation", "Checking that input matches what is expected before using it."],
    ],
    checks: [
      ["Why does the input ' OR '1'='1 work against vulnerable login forms?", "It changes the query's logic so the condition is always true."],
      ["What is the main defense against SQL injection?", "Parameterized queries (prepared statements), plus input validation."],
    ],
    body: R`
Applications are vulnerable when they **trust input**.

| Attack | How |
| --- | --- |
| SQL injection | input becomes part of a database query |
| cross-site scripting | input is displayed as live script to other users |
| buffer overflow | input longer than expected overwrites memory |
| broken access control | users reach data or functions they should not |
| insecure direct object reference | changing an ID in a URL reveals another user's record |

## SQL injection example

§§§text
SELECT * FROM users WHERE name = 'INPUT' AND pass = 'INPUT2';
§§§

If INPUT is §admin' --§, the rest of the query is commented out and the password check disappears.

Data is also exposed through misconfigured cloud storage, lost devices, weak access controls and insiders.
`,
    note: ["Never build queries by joining strings", "Parameterized queries send the command and the data separately, so input can never change the command."],
    ex: ["Identify the flaw", "Changing a URL from /grades?student=1042 to /grades?student=1043 shows another student's grades. What vulnerability is this?", ["The application does not check that the requester owns record 1043."], "broken access control (an insecure direct object reference)."],
  },
  {
    id: "protecting-applications-and-data-managerial-controls-and-access-controls",
    obj: ["Apply data classification, access control models and least privilege."],
    terms: [
      ["Role-based access control (RBAC)", "Permissions are assigned to roles, and users receive roles."],
      ["Data classification", "Labeling data by sensitivity (public, internal, confidential, restricted) to decide how it is protected."],
      ["Separation of duties", "Dividing critical tasks so no single person can complete them alone."],
    ],
    checks: [
      ["Why is RBAC easier to manage than assigning permissions to each user?", "Changing a role updates everyone in it, and new users simply get the right role."],
      ["What should happen to an employee's access when they change jobs?", "Remove permissions they no longer need and grant only what the new role requires."],
    ],
    body: R`
## Managerial controls

- **Data classification** policies.
- **Retention and disposal** policies.
- **Access reviews**: periodically confirm each user still needs their access.
- **Separation of duties** and **least privilege**.
- **Backups** (the 3-2-1 rule: three copies, two media types, one offsite).

## Access control models

| Model | Basis |
| --- | --- |
| discretionary (DAC) | owners choose who gets access (file permissions) |
| role-based (RBAC) | access follows job role |
| mandatory (MAC) | labels and clearances set by policy |
| attribute-based (ABAC) | rules using attributes like time, location, department |
`,
    note: ["Privilege creep", "Employees who move between jobs often keep old access. Regular access reviews remove it."],
    ex: ["Choose a model", "A hospital wants all nurses to view patient charts on their ward, and doctors to also edit them. Which model fits?", ["Access depends on job role."], "role-based access control."],
  },
  {
    id: "protecting-stored-data-with-cryptography",
    obj: ["Explain symmetric encryption and hashing and their uses for data at rest."],
    terms: [
      ["Symmetric encryption", "One shared key encrypts and decrypts (for example, AES)."],
      ["Hash function", "A one-way function that produces a fixed-length digest; any change to the input changes the digest."],
      ["Salt", "Random data added to a password before hashing so identical passwords produce different hashes."],
    ],
    checks: [
      ["Can a hash be decrypted to recover the original data?", "No; hashing is one-way."],
      ["What does a changed hash of a downloaded file indicate?", "The file was altered or corrupted (integrity failure)."],
    ],
    body: R`
| Tool | Protects | Reversible? |
| --- | --- | --- |
| symmetric encryption (AES) | confidentiality | yes, with the key |
| hashing (SHA-256) | integrity | no |

## Encryption at rest

Full-disk encryption and encrypted databases keep data confidential if devices are stolen. The key must be protected; whoever has it can decrypt.

## Hashing

- Verify file integrity by comparing hashes.
- Store passwords as **salted hashes**, using slow algorithms designed for passwords (bcrypt, Argon2). Salts defeat precomputed (rainbow table) attacks.

## Simple ciphers

A Caesar cipher shifts each letter by a fixed amount: with shift 3, CAT becomes FDW. It is trivially broken, but it illustrates keys and substitution.
`,
    note: ["Key management", "Encryption is only as strong as key protection. A key stored next to the data protects almost nothing."],
    ex: ["Choose the tool", "A school wants to detect whether anyone changes exam files after they are finalized. Encryption or hashing?", ["Detecting changes is an integrity goal."], "hashing: record each file's hash and compare later."],
  },
  {
    id: "asymmetric-cryptography",
    obj: ["Explain public key cryptography, digital signatures and certificates."],
    terms: [
      ["Asymmetric encryption", "A key pair: data encrypted with one key can only be decrypted with the other."],
      ["Digital signature", "A hash signed with the sender's private key, verifiable with their public key."],
      ["Certificate authority", "A trusted organization that binds a public key to an identity in a digital certificate."],
    ],
    checks: [
      ["To send Bob a confidential message, which key do you use?", "Bob's public key."],
      ["What does a valid digital signature prove?", "The message came from the private-key holder and was not changed."],
    ],
    body: R`
| Goal | Encrypt / sign with | Decrypt / verify with |
| --- | --- | --- |
| confidentiality to Bob | Bob's **public** key | Bob's **private** key |
| proving Alice sent it (signature) | Alice's **private** key | Alice's **public** key |

## Digital signatures

1. Alice hashes the message.
2. She signs the hash with her private key.
3. Bob verifies with Alice's public key and compares hashes.

This provides **integrity**, **authentication** and **non-repudiation**.

## TLS and certificates

Websites present a **certificate**, signed by a certificate authority, binding their domain to a public key. Browsers use it to set up a shared symmetric key for the session: asymmetric for the handshake, symmetric for speed.
`,
    note: ["Private keys stay private", "If a private key is stolen, an attacker can read messages meant for its owner and forge their signatures. Certificates for stolen keys must be revoked."],
    ex: ["Signing", "Alice wants anyone to be able to verify that a software update came from her. Which key signs it?", ["Verification must be possible for everyone, using her public key.", "So she signs with her private key."], "Alice's private key."],
  },
  {
    id: "protecting-applications",
    obj: ["Describe secure development practices and application controls."],
    terms: [
      ["Parameterized query", "A database query in which user input is passed separately from the command."],
      ["Patch management", "Tracking, testing and installing software updates."],
      ["Secure by design", "Building security into software from the start rather than adding it later."],
    ],
    checks: [
      ["Name two secure coding practices.", "Input validation, parameterized queries, output encoding, least privilege, and proper error handling."],
      ["Why should error messages shown to users be generic?", "Detailed errors can reveal system information useful to attackers."],
    ],
    body: R`
## Secure coding

- **Validate input** (type, length, format) on the server.
- **Parameterized queries** to prevent SQL injection.
- **Encode output** to prevent XSS.
- Use **least privilege** for application accounts.
- Show **generic error messages**; log details privately.
- Keep **dependencies** updated.

## Operations

- Patch applications promptly.
- Use **web application firewalls** to filter malicious requests.
- Require MFA and strong session management.
- Test with code reviews, scanning and penetration testing.
`,
    note: ["Allow lists beat block lists", "Accept only known-good input (an allow list) rather than trying to block every bad pattern."],
    ex: ["Fix the form", "A search box passes user text directly into a SQL query. What change best prevents injection?", ["Filtering characters can be bypassed.", "Parameterized queries keep data separate from code."], "use a parameterized query (prepared statement)."],
  },
  {
    id: "detecting-attacks-on-data-and-applications",
    obj: ["Analyze web server and database logs to detect application attacks and data exfiltration."],
    terms: [
      ["Data exfiltration", "Unauthorized transfer of data out of an organization."],
      ["File integrity monitoring", "Detecting unauthorized changes to files by comparing hashes."],
    ],
    checks: [
      ["What in a web log suggests SQL injection attempts?", "Requests containing SQL syntax such as quotes, OR 1=1, UNION SELECT or comment marks."],
      ["What suggests data exfiltration?", "Unusually large outbound transfers, often at odd hours or to unknown destinations."],
    ],
    body: R`
## Web server logs

§§§text
203.0.113.5 "GET /search?q=shoes" 200
203.0.113.5 "GET /search?q=' OR '1'='1" 500
203.0.113.5 "GET /search?q=' UNION SELECT user,pass FROM users--" 200
§§§

SQL keywords and quote characters in parameters show injection attempts. A 500 error followed by a 200 with a UNION may mean the attack worked.

## Other indicators

- Script tags in input fields (XSS attempts).
- Many requests for sequential record IDs.
- A database account reading far more rows than usual.
- Large outbound transfers to unfamiliar destinations.
- Changed hashes for application files.

Responses include blocking the source, fixing the vulnerability, reviewing what data was accessed and notifying affected people as required by law.
`,
    note: ["Response codes", "200 means success, 401/403 mean denied, 404 not found and 500 a server error. An injection that produces errors and then successes deserves immediate attention."],
    ex: ["Read the log", "A log shows requests to /records?id=1, id=2, id=3, … id=4800 from one IP in five minutes, all returning 200. What is happening?", ["Sequential IDs, very fast, all successful."], "automated scraping of records through broken access control: likely data exfiltration."],
  },
];
