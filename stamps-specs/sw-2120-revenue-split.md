SW 120: Revenue Splitting
==================================

# Status
Draft

# Authors
* Dave Foderick - dfoderick@gmail.com

# Dependencies
* None

# Specification

The modern web offers many occasions to pay for content created by multiple contributors. This specification standardizes the format for splitting revenue between contributors. Stamps has the capability to split payments to multiple outputs. The sender wallet needs to know how to divide the funds to enable real time payments to multiple content contributors.

A prime example of revenue splitting is called "split sheets" in the industry where a group of people have formed an agreement to be paid according to a percentage of the revenue.

![Revenue Split Example Image](https://www.omarimc.com/wp-content/uploads/2017/06/6a00d83451b36c69e201bb089511f2970d-500wi.jpg)


Another example would be a live stream with a host, a guest and a chat moderator. The contributors could agree to the following revenue split:
```
host@mystreamingplatform.com as host, 50%
bigstar@tictoc.com as guest, 40%
mod@chatbot.com as moderator, 10%
```

## Benefits
* Defines a standard structure to split payments according to an agreed upon schedule of percentages.
* The revenue split can be easily published publicly or embedded into a contract in a machine readable format.
* The standard structure can be canonical and therefore hashed and signed by participants and allow for revisions.
* The format should be easily implemented to facilitate real time payment splitting.


## Prior Work
The closest prior work known to the author is the work done by the W3C for Web Monetization. https://webmonetization.org/docs/probabilistic-rev-sharing. 


## Disclaimer
* The following proposed format needs proper discussion and technical details solidified. Proposed format is used solely for the purposes of opening discussion.

## Proposed Structure

* The normal format would be an array of javascript objects.
Each object in the array consists of:  
	* A paymail (or address or pubkey). Required.
	* A percentage. Required if using an array.
	* A role. Optional. Or spec can allow additional attributes that can be ignored.

* There is an overall constraint that the percentages add up to 1 (100%). However in the case where the implementer fails to specify exactly 100%, recommendations could be followed to scale the percentages up or down to equal 1 (100%).

* Example: 
```
[
	{payTo:"host@mystreamingplatform.com", percent:.5, role:"producer"},
	{payTo:"guest@tikytoky.com", percent:.4, role:"guest"},
	{payTo:"mod@superchat.com", percent:.1, role:"moderator"}
]
```
* A simplified example could exclude the array for a single string formatted as an email
`greatcontent@paymail.com`
with the assumption that payout is 100% if only a single paymail is presented.

## Discussion Items

* The format should be machine readable
* The format should be in a canonical format (remove extraneous spaces)
* The format should be embeddable in contracts or media manifests
* The paymail could be an address or potentially a url (needs discussion)


