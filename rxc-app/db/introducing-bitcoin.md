---
title: Introducing Bitcoin
author: "ryan@ryanxcharles.com"
date: 2021-11-19 13:00:00 PST
type: video
youtubeId: fj6zk8DIimc
---

# Introduction

I've been involved in Bitcoin since May 13, 2011 when I read an article about Bitcoin on Hacker News. It struck me that Bitcoin had the potential to be the foundation of a new global industry like the internet, but with money instead of communications. I was hooked right away and spent weeks researching it.

That was more than ten years ago now. Since then I have had the fortunate of getting to know the inventor of Bitcoin, Craig Wright (a.k.a. Satoshi Nakamoto), and I have been able to learn directly from him about the entire theoretical background of Bitcoin and every line of the Bitcoin white paper.

My discussions with the inventor of Bitcoin are freely available in the [Theory of Bitcoin](https://www.theoryofbitcoin.com) interview series. [I recommend watching every interview in chronological order using this playlist](https://www.youtube.com/playlist?list=PLOqZWfHm-gzDjTBDiDAZEp8sBUkphnaGe). The full interview series is more than 50 hours in length which is the equivalent of about five audio books. It is is well worth the time of every person full-time involved in the industry to watch the entire interview series.

This introduction is an outline of the key concepts discussed in Theory of Bitcoin. It is available both in the form of a [video](https://youtu.be/fj6zk8DIimc) and this article summarizing all of the concepts.

# Basics

* The definition of Bitcoin is contained in the [Bitcoin white paper](https://craigwright.net/bitcoin-white-paper.pdf) published by Satoshi Nakamoto (Craig Wright) on October 31, 2008.
* The definition is expanded in the original source code used to launch Bitcoin in January of 2009.
* Bitcoin is a peer-to-peer electronic cash system. This is the title of the white paper: "Bitcoin: A Peer-to-Peer Electronic Cash System".
* "Peer-to-peer" has two different meanings: The users send transactions peer-to-peer and the miners connect to each other peer-to-peer.
* Users send transactions from one to the other, peer-to-peer, just like handing a physical cash note to someone in the real world, but electronic instead of physical.
* The miners all connect together in a small world graph. "Small world" just means that each miner connects to each other miner. They form a peer-to-peer network.
* Users are not miners. Users run Simplified Payment Verification (SPV), which is a light node that monitors block headers and maintains the user's own transactions, but not the transactions of others.
* Miners see all transactions. Users only see their own transactions.

# Blockchain

* The blockchain is the history of all transactions. It is completely public plaintext information that anyone can audit.
* The blockchain consists of a chain of blocks. Each block includes all transactions that were created since the last block.
* Miners create blocks. If you are not creating blocks then you aren't a miner. A "node" in the white paper means a miner. It does not mean SPV nodes. SPV nodes are users.
* A new block is created on average once every ten minutes. The true length of time is random but always averages ten minutes.
* The difficulty of mining a block is adjusted automatically to ensure that it always takes approximately ten minutes to produce a block.
* Miners must produce a proof-of-work (PoW) hash in each block which is a hash starting with a small number of zeros to prove they have spent real-world resources mining the block.
* Proof-of-work is an algorithm for the Handicap Principle. The Handicap Principle is a biological idea that species create costly signals to indicate health, like a peacock's tail or the horns of an antelope. The proof-of-work hash is the beautiful tail of the miner.

# Law

* Bitcoin is an evidence system that brings law to the internet.
* Bitcoin is not anarchist. Bitcoin is designed to operate in a system of laws.
* Bitcoin works because the law works. If you need to, such as when a counterparty commits fraud, you can use the immutable evidence from the blockchain in court.
* Bitcoin does not work in an anarchist system because contracts are not enforceable and anyone can change the rules at any time. The rules are only set in stone insofar as contracts are enforceable, which requires law.
* Bitcoin makes it easier to follow existing regulations in business. For instance, Sarbanes-Oxley requires public companies to keep immutable accounting records. Bitcoin makes this truly possible for the first time, if utilized properly, by making it impossible to have two sets of books.
* Bitcoin makes it easier for governments to collect taxes, if utilized properly, by making all tax payments transparent.
* Bitcoin makes it easier to hold governments accountable, if utilized properly, by making tax collection transparent and auditable by the people.

# Computer Science

* Bitcoin is Turing Complete, which means it can compute any number. It can do anything that any computer can do.
* Each transaction in Bitcoin has multiple inputs and multiple outputs.
* An output has a value of satoshis (one satoshi is one hundred millionth of a bitcoin) and a script, sometimes called a locking script.
* An input contains a reference to an earlier output and includes a script that is sometimes called an unlocking script.
* To check an input for validity, execute the input script, and then execute the linked output script. If the return value is not false, then the input is valid.
* A transaction is valid if all inputs are valid and if the transaction satisfies other sanity checks such as that they do not create Bitcoin out of thin air.
* There is one case where a transaction can create Bitcoin out of thin air, which is if it is the first transaction in a block. These are called coinbase transactions and they are where miners get the mining reward.

# Computer Security

* There is no such thing as perfect security. Security is always and everywhere economic. An economically secure system is a system that is more costly to attack than the gain from attacking it.
* Bitcoin is economically secure because it costs more to attack it than the gain from attacking it.
* Quantum computers are not a threat to Bitcoin. Firstly, because they are unlikely to be commercially viable any time soon. And secondly, because quantum computers cannot crack hash functions, public keys can simply be hidden when they are not needed, and can store an amount of value that is lower than the cost of cracking them when they must be revealed.
* Public keys should never be re-used on the blockchain both for privacy and to deter cracking attempts.
* Proof-of-work is not a security mechanism. Proof-of-work is a mechanism to de-anonymize miners. Miners cannot be anonymous because they must use large data centers to be competitive which always have discoverable locations in the real world through the use of traditional network scanning tools.
* Bitcoin is decentralized because it has no central point of failure, not because everybody runs a node.
* Users run SPV wallets which track the block headers. The wide distribution of block headers through the ubiquitous use of SPV is necessary to secure the network because the wide distribution of the block headers is what enables users to hold miners accountable. Miners cannot commit fraud such as through creating more than 21 million bitcoin not because everyone runs a node but because everyone has the block headers and can prove if the miners do commit fraud.

# Economics

* Bitcoin is an economic system because the security and functioning of the system uses economic incentives.
* The miners are independent businesses that compete to earn more bitcoin for processing transactions. Better miners are more profitable.
* Pre-consensus is incompatible with Bitcoin beacause it creates collaboration between miners which ruins their independendence and creates a cartel which is a central point of failure.
* There are and will always be a small number of large miners and a large number of small miners. This is called the Pareto distribution or the 80/20 rule.
* There is a fixed supply of bitcoin, approximately 21 million, with a variable price. There is no way to fix the price to any real-world asset without creating a central point of failure, so a fixed supply instead is the only solution.
* Bitcoin is decentralized because anybody can run a node, not because everybody does run a node.

# Networks

* The miners form a small world graphic, meaning each miner connects to every other miner.
* The users, or SPV nodes, form something like a mesh network, because every user is connect to some subset of other users directly but not all. 
* Theoretically, the miners and users form a Mandala network, which has a highly connected central core (the miners) and a lightly connected outer shell (the users).
* In practice, the network structure resembles a Mandala network, but the true network structure is determined by whoever the miners and users are actually connected to.

# Identity

* Bitcoin is private, but not anonymous. Bitcoin does not require identity for micropayments. But Bitcoin does require identity for moderate or large payments.
* Bitcoin is private because identity information is not included on the blockchain. Best practice is not to re-use addresses and to not merge outputs. If this best practice is followed, it is very difficult to infer real-world identity from public data. As the network grows, it becomes even more difficult to infer real-world identity like finding a needle in a haystack that gets bigger and bigger with time.
* Bitcoin does not include a solution to identity. Identity is firewalled from the blockchain and must be provided by a separate system.
* Moderate and large transactions require the exchange of identity information for the security and compliance of the parties involved.
* Bitcoin is not anonymous for anything other than micropayments because fiat gateways always require identity to be revealed.

# Cryptocurrency

* Bitcoin is not a cryptocurrency. "Crypto" means secret writing and "currency" means government money. Bitcoin is neither of these.
* Bitcoin is not encrypted. Bitcoin is completely public plaintext information that anyone can audit.
* Bitcoin could be a currency, a.k.a. government money, if a government enabled citizens to pay tax with it.
* BTC is not Bitcoin. BTC is a fork of Bitcoin created by the Bitcoin Core developers in 2017.
* BTC is not Bitcoin because it includes segwit, which breaks the definition of a "coin" in the white paper by removing the signatures from the transaction chain.
* BTC is not Bitcoin because it strictly limits the maximum block size, which limits the volume of transactions and breaks the long-term viability of BTC as a competitive electronic cash system.
* BTC is passing off as Bitcoin. If you bought BTC anytime from 2017 until now and are under the impression that it is Bitcoin, then you have been scammed.
* The cryptocurrency industry is a giant scam created by pump-and-dump scammers and drug dealers and has nothing to do with Bitcoin.

# History

* David Chaum published some of the original ideas in the 1980s. DigiCash was David Chaum's company. Chaum's work also goes by the name Chaumian eCash.
* There were many peer-to-peer electronic cash systems in the 1990s and 2000s, including Mojo Nation.
* Bitcoin is very similar to the 1999 solution by Massias et al. (see reference #2 in the white paper) except where the network itself distributes the block headers instead of publishing them in a separate newspaper.
* Craig Wright published the Bitcoin white paper on October 21, 2008.
* The Bitcoin network was started with Craig Wright's nodes in January, 2009.
* The ticker symbol representing Bitcoin on exchanges is BSV. BTC is not Bitcoin.

# Future

* The most important next step in the future of Bitcoin is the widespread adoption of SPV wallets in the ecosystem for security and scalability.
* Alongside SPV, we must implement an identity system to enable the use of real-world identity where appropriate, such as large payments and exchanges.
* Once these new protocols are developed and adopted, advanced applications can be created such as Internet of Things (IoT), supply chain, finance, and anything else at the intersection of value and communication.

# Satoshi Nakamoto

* Bitcoin was invented by Satoshi Nakamoto.
* The true identity of Satoshi Nakamoto is Craig S. Wright, an Australian-British polymath genius with Asperger Syndrome.
* Craig Wright is the Chief Scientist of nChain, a company he founded for Bitcoin research and development.
* Craig Wright has a doctorate in theology, a PhD in computer science, and more than 17 degrees in total.
* Craig Wright has credentials spanning computer security, computer science, law, economics, and many other areas, most of which are relevant to Bitcoin.
* Craig Wright is pursuing more doctorates, graduate-level degees, undergraduate degrees, and other credentials to this day.

# Ryan X. Charles

* I discovered Bitcoin on May 13, 2011.
* I quit my physics PhD in the summer of 2013 and to pursue Bitcoin full-time.
* I have developed or worked on Bitcoin wallets as an engineer at [BitPay](https://www.bitpay.com), [reddit](https://www.reddit.com), and [BitGo](https://www.bitgo.com).
* I started my own company in August 2015. The company would become called Yours Inc. and was incorporated in the summer of 2016.
* Yours Inc. created two Bitcoin wallets: One for Yours.org, a social network with micropayments for funding content creators, and [Money Button](https://www.moneybutton.com), a Bitcoin Wallet as a Service (WaaS) for consumers and businesses.
* The IP of Yours Inc. was sold to [The Bayesian Group](https://www.bayesian.com) in September of 2020. Bayesian rebranded to [Fabriik](https://www.fabriik.com) shortly after the acquisition. I resigned from Fabriik in February of 2021.
* I started my second company, [Coasian](https://www.coasian.com), in Februrary of 2021.
* The primary technology of Coasian is [OpenSPV](https://www.openspv.com), a full-stack open-source SPV wallet implementation. OpenSPV is the 6th Bitcoin wallet I have created or worked on. It is being used inside products for consumers and businesses that will launch in 2022.

# Conclusion

Bitcoin is a peer-to-peer electronic cash system. Bitcoin is extremely interdisciplinary and in order to understand the full scope of Bitcoin, one must learn many different fields of study. Those fields of study include but are not limited to computer science, economics, and law. Few people have already mastered all of the background material necessary to understand Bitcoin, and as such most students of Bitcoin should expect to spend years studying material in order to have a complete understanding. The outline given in this article can be used as a guide for further study.