The Social Bitcoin Web (SBW) is:

A network of sovereign individuals in the information age. Everyone in the SBW owns their own domain name. Hosted on their own domain name is a website, email, and bitcoin wallet. Your domain name is your primary entry to your public persona (e.g., ryanxcharles.com, craigwright.net, etc.). Your email and paymail are the same (ryan@ryanxcharles.net, craig@cragwright.net, etc.). Well, not literally everyone does this. You can run a service like heartmail.com (e.g. user@heartmail.com) where users can sign up and they don’t necessarily have to own a domain name, just like email. But at the start, we need everyone to own a domain name to make the network as strong as possible.

A set of protocol extensions to paymail, bitcoin, and the WWW that enable sharing (and paying for) content website to website. By copying a video from one website to another when the video is shared, the SBW extremely robust against censorship. Especially when you consider the domains and cloud infrastructure are distributed all over the world, when a video is widely shared it is practically impossible to censor.

An overlay network to Bitcoin. Our network includes an implementation of identity (social), SPV (bitcoin), and apps and content (web). The websites are also apps that run on iPhone and Android.

A market of information. Rather than producing and trading material items and exchanging material money, we are producing and trading information (content, software) and exchanging digital cash (bitcoin). We can enforce arbitrary copyright with DRM. Items can be scarce.

An implementation of the Metanet. My interpretation of CSW’s idea for the Metanet is essentially a market for information. Bitcoin solves the cash problem but not the identity problem. Web solves the content problem. What we need is to attach all the lessons from social media (Facebook, YouTube, etc.) except not on one centralized service. Rather, everybody operates their own in a manner interoperable with others, like email, WWW, RSS. Other relevant systems are Usenet and BBS which have some aspects in common. Everything will eventually be as user-friendly as Facebook and it will not be difficult in the slightest to get this going, but at first it will require a lot of expertise to get your app working until we solve all the UX problems.

A social network where everybody owns their own domain name and website. This does NOT mean that you run the entire network yourself. Your node is your data only, just like your SPV wallet is your transactions only. You manage your own data. You only have to manage the data of others if you share their content, index their content, etc. You can choose to provide services to users. I will operate a node that makes it easy for people to get going and my service will manage their data for them (heartmail.com). However, I am not the only one doing this. Anyone can operate a node that is open for anyone to create an account. Your node is your website. The edges are the links between websites. You can run many nodes. The decentralization model is exactly like email. Anyone can run a node, but most users will probably use a service.

An app that runs on iPhone, Android, web, AWS, Google Cloud, Microsoft Azure. In my implementation, the front-end is Expo (cross platform React Native + React Native Web) and the backend is Kubernetes + Cassandra (AWS, Google, Microsoft). However, we can have many implementations and my implementation is just one, so the technical details can vary depending on your needs.

Joel has helped me create this channel to work on the SBW. I’m hoping to identify other people who want to be members of the SBW to help build it. Each person is fully responsible for developing their own system. You will own and operate your own domain name, website, email, and Bitcoin wallet. The only people allow in this channel are people who own their own domain name and are willing to spend at least some time (e.g., 1 hour) per week developing their own website.

Similar to Wordpress, we can provide an implementation that is open source and available for everyone to run for free. My business will monetize a premium version of the product just like Wordpress. Other people can create their own businesses and hosting distinct premium features, or other products and services that work on or with the SBW. I will own the names of the products I create, such as OpenSPV, but all the core software is MIT-licensed and sharable. Because software itself is information and can be traded with this system, sometime next year we will be able to buy and sell parts of the system using itself.

The 3D spinning logo is in honor of the 1990s web pages. The 1990s were the glory days of the internet when everything seemed possible. The 2000s were a period of development and growth. The 2010s were the decent into centralization and censorship because of the absence of bitcoin (rather, the absence of an understanding of bitcoin) and the prevalence of the ad-based business models. We are going to spend the next ~ 10 years redoing the 1990s, but with Bitcoin this time. It starts by getting a web page going for yourself. Perhaps with your own 3D spinning logo, or whatever else you want. Our new network will resolve all the centralization issues of the 2010s. We will have a true market of information. This will disempower the centralized web services and empower every individual to trade freely on the internet.

I have solved the following problems in theory:

Decentralized search. Search will be initiated from your own web page, not Google. Your search engine will search your own web page first. It will then query your friends and your friends’ friends. Results will be sorted by relevance as you expect. Want to see what Google is censoring? Add the Google search engine as one of the 100 search nodes that you subscribe to. It is unlikely Google will rapidly adopt these protocols because it disempowers them. This is how we extract the Google cancer from society.

Decentralized social media. You will post videos, articles, images, and tweets to your own web page. There will be a “share” button attached to each piece of content. You can press “share” to copy a video, image, tweet, or article from on web page to another. This is practically impossible to censor. Content that is genuinely popular will become more robust as it is widely shared. We can apply DRM so that all content is distributed according to license terms created by the author. You can give stuff away for free or sell it with relicensing terms that allow for sharing in the revenue. Why would anyone use Facebook anymore when you can completely own your own data and monetize it however you wish without worrying that you will be deleted by Mark Zuckerberg?

Decentralized login. Rather than rely on small set of login authorities like Google and Apple, everyone is going to run authentication protocols on their own domain name. You will login to ryanxcharles.com using yourname@yourdomain.tld. For instance, when CSW logs into RXC, he will see “craig@craigwright.net” in the top right of the app indicating he has logged in as himself into my website.

Everyone manages their own keys automatically with no password and no mnemonic. I have developed a protocol that I call “Two Factor Friend” (2FF) that allows you to login from your email only so long as you have at least 1 friend who is online with a shared secret. Your friend has a secret that does not give them access to your keys or data but that when shared with you allows you to restore access to keys and data. You can choose to write down your keys, but if you have many friends/devices, you don’t need to. Your 2FFs can be businesses who are always online and therefore you can always reliably log back in at any time so long as you retain access to your primary email account.

I have written some of the software myself, but I need several more months of effort to launch a complete MVP. I will be sharing all of my software for free until we get to MVP. After that point I will begin writing new premium features that are not free and I will sell those pieces using the SBW itself. This is my first business model. I want to make sure the network is going and earning money doesn’t matter for a long time. My real business plan is actually to develop new products and services on top of the SBW. I have 40 (yes, 40) business ideas that I can easily create after this is launched and working. By 2023 or so I should have multiple distinct businesses operating on the SBW all of which have separate brands, products, and revenue. This is possible because most of the work happens in the core protocols and software and once those are going it becomes much easier to launch new businesses that all have the same software core.

I can’t do everything myself. Even if I could, the network has no meaning if I am the only node on the network. I need truly sovereign individuals to understand the idea and build their own nodes without any dependence on me. This channel should help us collaborate until we get the network going and we can rely on the network instead of Slack.

Besides simply operating your own node (domain+website+email+wallet), there are specific ways people can contribute at this time:

Engineering (protocols and software)

Communication (writing up and publishing protocol specs and documentation)

Design (UI/UX, branding)

Marketing (producing and distributing content)

Organization (helping to keep track of everyone who is helping and arranging calls)

Principles of the Social Bitcoin Web:

Never introduce a central point of failure. Facebook, Google and Twitter are the problem we are solving. Big Tech stopped helping the world somewhere in the 2000s and starting creating centralized services instead of protocols. This is how they captured the world. It is critical that we adopt a principle of decentralization (“no central point of failure”) to the protocols we build. Your app is not a protocol. A protocol is something that anyone can use with one any dependency on one organization.

Everybody owns their own domain name in their own country with their own bitcoin wallet. We need to get a core of this network that are genuinely strong sovereign individuals. It is imperative that you own, operate, and grow your own website as independently as possible. Only if we are truly sovereign are we truly robust against censorship. If I were develop a bunch of decentralized protocols and then tell everyone to go visit heartmail.com to sign up, this would obviously violate this principle. Please own your own domain name, website, and email. You can get this going in one day. It is not hard. You will develop this yourself by adding in any of the software that other people create as we go. This is similar to how blogging worked in the early 2000s where everyone owned their own website and upload content with FTP.

Policy is up to the individual. Do you want to sell ads and encourage everyone in the world to sign up to your centralized service over a period of 10 years and then once they are captured to sell them out to the US government? You will be able to do so. However, you will also have to compete with other service providers using interoperable protocols. Why would anyone use your service when it is revealed that you are malicious? They will simply press the “share” button and put their content on their own domain name name and escape your attempted tyranny. Personally, I plan to have a policy of truth. If I ever catch you in a lie on my platform or elsewhere, you will be permanently banned from all of my nodes. I tell the truth and I am only interested in providing services for others who tell the truth always and everywhere.

---

Social Bitcoin Web (SBW): A network of sovereign individuals. Also, a set of protocol extensions to paymail, Bitcoin, and the web.

OpenSPV: The full-stack open-source Bitcoin wallet which includes an implementation of SBW.

Coasian: My company that writes and sells software, most significantly OpenSPV.

ryanxcharles.com: My personal web page which runs an instance of OpenSPV.

HeartMail: An instance of OpenSPV intended for mainstream users who want to try the free ad-funded version before shelling out any money for anything.