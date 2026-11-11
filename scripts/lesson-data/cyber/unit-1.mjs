/* AP Cybersecurity, Units 1–3. */
const R = String.raw;
export const lessons = [
  {
    id: "understanding-social-engineering",
    obj: ["Identify social engineering attacks such as phishing, pretexting and tailgating, and the human tendencies they exploit."],
    terms: [
      ["Social engineering", "Manipulating people into revealing information or taking actions that weaken security."],
      ["Phishing", "Fraudulent messages that impersonate a trusted source; spear phishing targets a specific person."],
      ["Pretexting", "Inventing a believable scenario (a pretext) to obtain information, such as posing as IT support."],
    ],
    checks: [
      ["Which human tendencies do attackers exploit?", "Trust, authority, urgency, fear, curiosity and helpfulness."],
      ["What is the best first response to an urgent email asking you to reset your password through a link?", "Do not click; verify through a separate, trusted channel and report it."],
    ],
    body: R`
Most successful attacks begin with a person, not a computer. **Social engineering** exploits trust and emotion to get around technical controls.

| Attack | How it works |
| --- | --- |
| phishing | mass emails or texts that impersonate a trusted brand |
| spear phishing | a targeted message using personal details |
| whaling | spear phishing aimed at executives |
| vishing / smishing | phishing by voice call / SMS |
| pretexting | a made-up story to justify a request |
| baiting | leaving infected USB drives or offering free downloads |
| tailgating | following an authorized person through a secure door |

## Warning signs

Urgency ("your account will close today"), unusual requests, mismatched sender addresses or links, and requests for credentials or payment.

## Defenses

Security awareness training, verifying requests through a second channel, reporting procedures, email filtering and multifactor authentication.
`,
    note: ["People are a layer", "In defense in depth, trained users are one of the layers. Technical controls catch some attacks, and alert people catch others."],
    ex: ["Identify the attack", "A caller claims to be from the help desk, says there is a problem with an employee's account, and asks for the employee's password to fix it. What is this?", ["The caller invents a scenario to justify the request.", "It happens by phone."], "pretexting by voice (vishing). Help desks never need a user's password."],
  },
  {
    id: "suspicious-website-logins",
    obj: ["Recognize fake login pages and suspicious URLs, and explain how credential theft works."],
    terms: [
      ["Credential harvesting", "Collecting usernames and passwords, often with fake login pages."],
      ["Typosquatting", "Registering domains that resemble real ones, such as paypa1.com."],
      ["HTTPS", "HTTP encrypted with TLS; it protects data in transit but does not prove a site is legitimate."],
    ],
    checks: [
      ["In the URL https://login.example.com.evil.net/signin, which domain actually hosts the page?", "evil.net."],
      ["Does a padlock icon prove a site is safe?", "No; it shows the connection is encrypted, not that the site is legitimate."],
    ],
    body: R`
A phishing link usually leads to a login page that looks real. Anything typed there goes to the attacker.

## Reading a URL

The **registered domain** is the part just before the top-level domain (.com, .net, .org), read from the right:

| URL | Real domain |
| --- | --- |
| https://accounts.example.com/login | example.com |
| https://example.com.secure-login.io/ | secure-login.io |
| https://examp1e.com/ | examp1e.com (typosquat) |

## Red flags

- A domain that does not match the organization.
- Lookalike characters (rn for m, 1 for l).
- Unexpected login prompts after clicking a link in a message.
- A site asking for more information than usual.

Password managers help: they fill in credentials only on the exact domain they were saved for.
`,
    note: ["HTTPS is not trust", "Attackers can get valid certificates for their own domains. The padlock means encrypted, not legitimate."],
    ex: ["Spot the fake", "Which URL is most likely legitimate for a bank at bankofexample.com: (a) https://bankofexample.com.verify-id.co/, (b) https://secure.bankofexample.com/login, (c) https://bankofexarnple.com/?", ["(a) belongs to verify-id.co.", "(c) uses rn in place of m.", "(b) is a subdomain of bankofexample.com."], "(b)."],
  },
  {
    id: "best-practices-for-public-networks",
    obj: ["Describe the risks of public Wi-Fi and the controls that reduce them."],
    terms: [
      ["Evil twin", "A rogue wireless access point that imitates a legitimate network name."],
      ["VPN", "A virtual private network: an encrypted tunnel between a device and a trusted server."],
      ["Man-in-the-middle (on-path) attack", "An attacker secretly relays and possibly alters communication between two parties."],
    ],
    checks: [
      ["Why is an open (no password) Wi-Fi network risky?", "Traffic is not encrypted at the wireless layer, so others nearby can capture it."],
      ["Name two protections when using public Wi-Fi.", "Use a VPN, use HTTPS sites, turn off auto-connect and file sharing, and avoid sensitive tasks."],
    ],
    body: R`
Public networks in cafés, airports and hotels are convenient and risky.

## Threats

- **Evil twins**: an attacker broadcasts a network named like the café's. Devices that join send their traffic through the attacker.
- **Eavesdropping** on unencrypted traffic.
- **On-path (man-in-the-middle) attacks** that intercept or alter data.
- Devices that **auto-connect** to remembered network names.

## Best practices

- Confirm the exact network name with staff.
- Use a **VPN** to encrypt all traffic.
- Prefer HTTPS sites; never ignore certificate warnings.
- Disable auto-connect, file sharing and Bluetooth when not needed.
- Use a phone hotspot for sensitive tasks.
`,
    note: ["Encryption at every layer", "WPA3 protects the wireless link, TLS protects web traffic, and a VPN protects everything leaving the device. Using more than one is defense in depth."],
    ex: ["Choosing a control", "A traveler must check a bank balance from an airport's open Wi-Fi. What is the most effective protection?", ["The network itself provides no encryption.", "A VPN encrypts all traffic to a trusted endpoint."], "connect through a VPN (or use a cellular connection) before logging in."],
  },
  {
    id: "ai-based-cybersecurity-attacks",
    obj: ["Explain how attackers use AI, including deepfakes, AI-written phishing and automated attacks."],
    terms: [
      ["Deepfake", "AI-generated audio, image or video that convincingly imitates a real person."],
      ["Prompt injection", "Hidden instructions in content that manipulate an AI system into ignoring its intended rules."],
    ],
    checks: [
      ["Why does AI make phishing harder to spot?", "It produces fluent, personalized messages without the spelling errors that once gave phishing away."],
      ["How can an organization guard against deepfake voice requests for payments?", "Require verification through a separate known channel and multi-person approval."],
    ],
    body: R`
AI lowers the cost and raises the quality of attacks.

| AI-enabled attack | Example |
| --- | --- |
| AI-written phishing | convincing, personalized emails at scale |
| deepfake voice or video | a "CEO" on a call asks finance to wire money |
| automated reconnaissance | scraping social media to tailor attacks |
| password guessing | models that predict likely passwords |
| attacks on AI systems | prompt injection, poisoned training data |

## Defenses

- Verification procedures that do not rely on recognizing a voice or face (call-back to a known number, code words, two-person approval).
- Training that focuses on the request (urgency, secrecy, money) rather than spelling mistakes.
- Limiting what AI tools can access and treating their inputs as untrusted.
`,
    note: ["Process beats perception", "As fakes improve, people cannot reliably detect them by eye or ear. Strong procedures protect even when the fake is perfect."],
    ex: ["A deepfake call", "An employee gets a video call from someone who looks and sounds like the CFO, asking for an urgent transfer. What should policy require?", ["Appearance and voice can be faked.", "Payment requests should be verified independently."], "verify through a known phone number or second approver before acting."],
  },
  {
    id: "leveraging-ai-in-cyber-defense",
    obj: ["Describe how AI helps defenders detect threats, and its limitations."],
    terms: [
      ["Anomaly detection", "Identifying activity that differs from a learned baseline of normal behavior."],
      ["False positive", "An alert for activity that is actually harmless."],
    ],
    checks: [
      ["Why is AI useful for analyzing security logs?", "It can process huge volumes quickly and spot unusual patterns humans would miss."],
      ["Name one limitation of AI-based detection.", "False positives, false negatives, biased or poisoned training data, and the need for human review."],
    ],
    body: R`
Defenders use AI to keep up with the volume of data and attacks.

## Uses

- **Anomaly detection**: learning normal logins, traffic and file access, then flagging deviations.
- **Spam and phishing filters** that classify messages.
- **Malware classification** by behavior rather than signature.
- **Summarizing alerts** and suggesting next steps for analysts.

## Limitations

- **False positives** waste analysts' time; **false negatives** let attacks through.
- Attackers can adapt to, or poison, models.
- AI suggestions need human judgment and oversight.

The course skill **Collaborate** includes working effectively with AI tools while checking their output.
`,
    note: ["Baselines matter", "An anomaly detector is only as good as its picture of normal. A network that was already compromised when the baseline was learned can hide an attacker."],
    ex: ["Tuning alerts", "An AI tool flags every login from a new city, producing hundreds of alerts a day, almost all harmless. What is the problem, and one fix?", ["The alerts are mostly false positives.", "Combine signals, such as new location plus failed MFA, before alerting."], "too many false positives; tune the rule to require multiple risk signals."],
  },
  {
    id: "cyber-foundations",
    obj: ["Explain the CIA triad, risk, vulnerabilities, threats and defense in depth."],
    terms: [
      ["CIA triad", "Confidentiality, integrity and availability: the three goals of security."],
      ["Risk", "The likelihood that a threat exploits a vulnerability, combined with the impact if it does."],
      ["Defense in depth", "Layering multiple security controls so that one failure does not expose an asset."],
    ],
    checks: [
      ["A ransomware attack encrypts a hospital's records. Which part of the CIA triad is most affected?", "Availability."],
      ["What are the three categories of security controls?", "Managerial (administrative), technical and physical."],
    ],
    body: R`
| Goal | Meaning | Example attack |
| --- | --- | --- |
| confidentiality | only authorized people can read data | data breach |
| integrity | data is accurate and unaltered | changing grades in a database |
| availability | systems and data are usable when needed | denial of service, ransomware |

## Risk

- An **asset** is anything of value; a **vulnerability** is a weakness; a **threat** is something that could exploit it.
- $$\text{risk} = \text{likelihood} \times \text{impact}$$
- Responses: **mitigate**, **transfer** (insurance), **avoid**, or **accept**.

## Controls

**Managerial** (policies, training), **technical** (firewalls, encryption), **physical** (locks, guards). Controls can be preventive, detective, deterrent or corrective. **Defense in depth** layers them.
`,
    note: ["Least privilege", "Give every user and program only the access it needs. It limits the damage any single compromise can do."],
    ex: ["Ranking risks", "Risk A: likelihood 4, impact 2. Risk B: likelihood 2, impact 5 (scale 1–5). Which is higher?", ["A: 4 × 2 = 8.", "B: 2 × 5 = 10."], "Risk B."],
  },
  {
    id: "physical-vulnerabilities-and-attacks",
    obj: ["Identify physical vulnerabilities and attacks against facilities and hardware."],
    terms: [
      ["Tailgating", "Following an authorized person through a secured entrance without authenticating."],
      ["Shoulder surfing", "Watching someone enter passwords or view sensitive information."],
      ["Dumpster diving", "Searching discarded materials for useful information."],
    ],
    checks: [
      ["Why do physical attacks matter in cybersecurity?", "Physical access can bypass many technical controls, for example by plugging in a device or stealing a drive."],
      ["What is a skimmer?", "A device attached to a card reader that steals card data."],
    ],
    body: R`
If an attacker can touch a device, many digital controls can be bypassed.

| Attack | Description |
| --- | --- |
| tailgating / piggybacking | entering behind an authorized person |
| shoulder surfing | watching screens or keypads |
| dumpster diving | recovering discarded documents or drives |
| device theft | stealing laptops, phones or backup drives |
| malicious USB / hardware implants | devices that install malware or log keystrokes |
| card skimming and badge cloning | copying card or badge data |

Vulnerabilities include propped-open doors, unattended unlocked computers, unshredded documents, unencrypted drives and poorly placed screens.
`,
    note: ["Insider threats", "Employees and contractors already have physical access. Controls such as badges, logging and least privilege also limit insiders."],
    ex: ["Classify", "Printed customer lists are thrown into an open recycling bin behind an office. What vulnerability does this create, and which control fixes it?", ["Anyone can retrieve the documents (dumpster diving)."], "shred sensitive documents (a physical and managerial control)."],
  },
  {
    id: "protecting-physical-spaces",
    obj: ["Select physical controls to protect facilities and equipment."],
    terms: [
      ["Access control vestibule (mantrap)", "Two interlocking doors that allow only one person through at a time."],
      ["Bollard", "A short sturdy post that blocks vehicles."],
    ],
    checks: [
      ["Which control stops tailgating most effectively?", "An access control vestibule or turnstile, backed by guards."],
      ["Give an example of a deterrent physical control.", "Visible cameras, signs, lighting or guards."],
    ],
    body: R`
Physical security uses layers from the perimeter inward.

| Layer | Controls |
| --- | --- |
| perimeter | fences, gates, bollards, lighting |
| building entry | badges, guards, turnstiles, vestibules |
| rooms | locks, biometric readers, visitor logs |
| devices | cable locks, locked server racks, screen privacy filters |
| data | encrypted drives, secure disposal, clean-desk policy |

Controls can **deter** (signs, lighting), **prevent** (locks), **detect** (cameras, alarms) or **correct** (incident response).

Environmental controls (fire suppression, HVAC, power backup) protect availability.
`,
    note: ["Match the control to the threat", "Cameras detect but do not prevent. Choose controls that address the specific vulnerability."],
    ex: ["Choose controls", "A server room is behind a door with a keypad whose code many staff share. What two improvements help most?", ["Shared codes cannot be traced to a person.", "Badge or biometric readers log individuals; a camera records entries."], "replace the keypad with individual badge or biometric access, and add logging or video."],
  },
  {
    id: "detecting-physical-attacks",
    obj: ["Use physical access logs and sensor data to detect intrusions."],
    terms: [
      ["Access log", "A record of who entered where and when, from badge or door systems."],
      ["Indicator of compromise", "Evidence that an attack may have occurred."],
    ],
    checks: [
      ["What does a badge used at two distant doors within one minute suggest?", "A cloned or shared badge."],
      ["What does a door-held-open alarm detect?", "A door propped open, often a sign of tailgating or bypass."],
    ],
    body: R`
Detective controls produce evidence; someone must review it.

## Sources

- **Badge logs**: user, door, time, granted or denied.
- **Cameras** and motion sensors.
- **Door alarms** (forced open, held open).
- **Visitor logs**.

## Signs of an attack

- Access outside a person's normal hours or areas.
- Repeated denied attempts at a door.
- One badge used in two places impossibly close in time.
- Entries without a matching badge record (tailgating, seen on camera).
- Physical evidence: tampered locks, unknown devices plugged into ports.
`,
    note: ["Correlate", "The strongest evidence combines sources: a badge entry at 2:14 a.m. plus camera footage plus a new device on the network."],
    ex: ["Read the log", "A log shows badge 4471 denied at the server room 5 times between 23:10 and 23:14, then granted at 23:16. What should an analyst do?", ["Repeated failures followed by success is suspicious.", "Check camera footage and confirm with the badge owner."], "treat it as a possible intrusion: verify identity and review video."],
  },
  {
    id: "network-vulnerabilities-and-attacks",
    obj: ["Describe common network attacks, including denial of service, spoofing and on-path attacks."],
    terms: [
      ["DoS / DDoS", "Overwhelming a service with traffic, from one source (DoS) or many (DDoS), to make it unavailable."],
      ["Spoofing", "Faking an address or identity, such as an IP, MAC or ARP response."],
      ["Port scan", "Probing a host to find which ports, and therefore services, are open."],
    ],
    checks: [
      ["Which part of the CIA triad does a DDoS attack target?", "Availability."],
      ["Why is an open, unused port a vulnerability?", "It exposes a service an attacker might exploit; unused services should be disabled."],
    ],
    body: R`
| Attack | Effect |
| --- | --- |
| DoS / DDoS | floods a target until it cannot serve legitimate users |
| ARP spoofing | redirects local traffic through the attacker (on-path) |
| DNS spoofing / poisoning | sends users to a malicious IP for a real name |
| port scanning | reconnaissance of open services |
| packet sniffing | captures unencrypted traffic |
| rogue access point | an unauthorized wireless device on the network |

## Common ports

| Port | Service |
| --- | --- |
| 22 | SSH |
| 23 | Telnet (unencrypted) |
| 25 | SMTP |
| 53 | DNS |
| 80 / 443 | HTTP / HTTPS |
| 3389 | RDP |
`,
    note: ["Insecure protocols", "Telnet, FTP and HTTP send data, including passwords, in plain text. Replace them with SSH, SFTP and HTTPS."],
    ex: ["Identify the attack", "Thousands of compromised devices send requests to a school's website at once, and it goes offline. What attack is this?", ["Many sources, goal is to stop service."], "a distributed denial-of-service (DDoS) attack."],
  },
  {
    id: "protecting-networks-managerial-controls-and-wireless-security",
    obj: ["Apply policies and wireless security settings to protect networks."],
    terms: [
      ["Acceptable use policy", "Rules for how users may use an organization's network and devices."],
      ["WPA3", "The current Wi-Fi security standard, providing stronger encryption and protection against password guessing."],
    ],
    checks: [
      ["Which Wi-Fi security protocol should be avoided because it is easily broken?", "WEP (and WPA with TKIP)."],
      ["Why change a router's default administrator password?", "Default credentials are publicly known."],
    ],
    body: R`
## Managerial controls

- **Acceptable use policies**, password policies, and change management.
- **Network documentation** and inventories of authorized devices.
- **Training** and **audits**.

## Wireless security

| Setting | Recommendation |
| --- | --- |
| encryption | WPA3 (or WPA2-AES); never WEP |
| passphrase | long and unique |
| admin credentials | change defaults |
| guest network | separate from internal devices |
| WPS | disable |
| firmware | keep updated |
| enterprise | WPA3-Enterprise with individual logins (802.1X) |
`,
    note: ["Individual credentials", "With one shared Wi-Fi password, a departing employee keeps access. Enterprise authentication gives each user their own login that can be revoked."],
    ex: ["Audit findings", "A café router uses WEP and the default admin password 'admin'. List two fixes.", ["WEP can be cracked in minutes.", "Default passwords are publicly known."], "switch to WPA3 (or WPA2-AES) and set a strong, unique admin password."],
  },
  {
    id: "protecting-networks-segmentation",
    obj: ["Explain network segmentation, VLANs, DMZs and subnetting."],
    terms: [
      ["Segmentation", "Dividing a network into separate zones so a compromise in one does not spread easily."],
      ["DMZ", "A zone between the internet and the internal network for public-facing servers."],
      ["CIDR notation", "Writing a network as an address and prefix length, such as 192.168.1.0/24."],
    ],
    checks: [
      ["How many usable host addresses are in a /24 network?", "254 (256 minus the network and broadcast addresses)."],
      ["Where should a public web server be placed?", "In a DMZ, separate from internal systems."],
    ],
    body: R`
A flat network lets an attacker who gets in reach everything. **Segmentation** limits movement.

- **VLANs** separate traffic logically on the same switches (staff, students, cameras, guests).
- A **DMZ** holds servers the internet must reach (web, email), with firewalls on both sides.
- **Air gaps** physically isolate critical systems.

## Subnet sizes

A prefix of /n leaves $$32 - n$$ host bits:

$$\text{usable hosts} = 2^{32-n} - 2$$

| Prefix | Addresses | Usable hosts |
| --- | --- | --- |
| /24 | 256 | 254 |
| /26 | 64 | 62 |
| /28 | 16 | 14 |
| /30 | 4 | 2 |
`,
    note: ["IoT on its own segment", "Smart cameras and thermostats are often poorly secured. Putting them on a separate VLAN keeps them from being a path to sensitive systems."],
    ex: ["Size a subnet", "A lab needs addresses for 50 devices. What is the smallest prefix that works?", ["/27 gives 30 usable hosts: too few.", "/26 gives 62 usable hosts."], "/26."],
  },
  {
    id: "protecting-networks-firewalls",
    obj: ["Read and write firewall rules, applying first-match processing and implicit deny."],
    terms: [
      ["Firewall", "A device or program that allows or blocks traffic based on rules."],
      ["Implicit deny", "Traffic that matches no rule is blocked."],
      ["Stateful firewall", "Tracks connections, so replies to allowed outbound traffic are permitted automatically."],
    ],
    checks: [
      ["Rules are processed top to bottom. A packet matches rules 2 and 5. Which applies?", "Rule 2, the first match."],
      ["Why place specific rules above general ones?", "A general rule higher up would match first and the specific rule would never apply."],
    ],
    body: R`
Most firewalls check rules **in order** and apply the **first match**. Anything not matched is denied (**implicit deny**).

§§§text
#  Action  Source          Destination    Port   Protocol
1  ALLOW   10.0.5.0/24     10.0.1.10      443    TCP
2  DENY    any             10.0.1.10      22     TCP
3  ALLOW   10.0.9.7        any            22     TCP
4  ALLOW   any             any            80     TCP
   (implicit deny all)
§§§

An SSH (22) connection from 10.0.9.7 to 10.0.1.10 matches rule 2 first, so it is **denied**, even though rule 3 would allow it.

Good practice: least privilege (allow only what is needed), specific rules before general ones, logging denied traffic, and reviewing rules regularly.
`,
    note: ["Host and network firewalls", "Network firewalls protect segments; host-based firewalls protect individual devices. Using both is defense in depth."],
    ex: ["Evaluate a packet", "Using the rules above, is HTTP (port 80) traffic from 172.16.0.4 to 10.0.1.10 allowed?", ["Rule 1: port 443 only, no match.", "Rule 2: port 22, no match.", "Rule 3: source differs, no match.", "Rule 4: any to any on port 80: match."], "allowed by rule 4."],
  },
  {
    id: "detecting-network-attacks",
    obj: ["Use logs, IDS/IPS alerts and traffic data to detect network attacks."],
    terms: [
      ["IDS / IPS", "Intrusion detection system (alerts) / intrusion prevention system (alerts and blocks)."],
      ["Signature-based detection", "Matching traffic against patterns of known attacks."],
      ["SIEM", "Security information and event management: collects and correlates logs from many sources."],
    ],
    checks: [
      ["What log pattern suggests a port scan?", "One source connecting to many different ports on a host in a short time."],
      ["What is the difference between an IDS and an IPS?", "An IDS only alerts; an IPS can also block traffic."],
    ],
    body: R`
| Indicator | Possible attack |
| --- | --- |
| one IP hitting many ports quickly | port scan |
| huge traffic from many IPs to one server | DDoS |
| many failed logins, then a success | brute force / password spraying |
| internal host sending large data to an unknown IP at night | data exfiltration |
| traffic to a known malicious domain | malware command and control |

**Signature-based** detection finds known attacks; **anomaly-based** detection finds unusual behavior, including new attacks, but with more false positives.

A **SIEM** correlates firewall, IDS, server and authentication logs to reveal attacks that no single log shows.
`,
    note: ["Timestamps", "Correlating logs depends on synchronized clocks. Different time zones or drifting clocks can hide the sequence of an attack."],
    ex: ["Read the firewall log", "Between 02:01:10 and 02:01:14, source 203.0.113.9 attempted connections to ports 21, 22, 23, 25, 80, 110, 143, 443 and 3389 on one server. What is happening?", ["Many ports, one source, a few seconds."], "a port scan (reconnaissance); block the source and check for follow-up attempts."],
  },
];
