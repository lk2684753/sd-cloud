# Concepts

# Content addressing in brief

sd-cloud's free, decentralized file storage relies on *content addressing* to find, reference, and retrieve your files on the network. Content addressing is a technique for organizing and locating data in a system in which **the key used to locate content is derived from the content itself, rather than its location.** While you don't need to understand content addressing to be able to incorporate sd-cloud in your apps and services, if you're curious about what's going on under the hood, read on.

## The basic problem

Consider what happens when you resolve a link like `sd-cloud/docs/concepts/content-addressing`. First, your operating system queries a global shared key-value store, split into many domains — you may know this as the Domain Name System (DNS). The DNS returns an IP address that your network card can use to send HTTP requests over the network, where this site's naming conventions turn the key `/concepts/content-addressing` into a response payload.

The problem is, components of an address like `sd-cloud/docs/concepts/content-addressing` are *mutable*, meaning they can change over time. In the context of the web, where *everything* is mutable and dynamic, this is just the way it's always been. As a result, [link rot](https://en.wikipedia-on-ipfs.org/wiki/Link_rot) is just something we've all learned to live with.

## CIDs: Location-independent, globally unique keys

However, thanks to content addressing, link rot may become a thing of the past. A content-addressed system such as sd-cloud is like our key-value-based DNS, with one significant difference: You no longer get to choose the keys. Instead, the keys are derived directly from the file contents using an algorithm that will always generate the same key for the same content.

As a result, we no longer need to coordinate among multiple writers to our store by splitting the key space into domains and locations on file systems. There's now one universal domain: the domain of all possible values. If multiple people add the same value, there's no collision in the key space. They just each get the same key back from the `put` method, with one additional benefit: The availability and performance of retrievals on the network is increased. This gives our keys *location independence*. There's one other important result: Each individual key is a unique signature for the data itself, ensuring *verifiability* that the key matches the content and the content hasn't been altered.

This type of key is called a *content identifier (CID)*. Once you know the CID of a file on the sd-cloud network, you have all you need for the network to locate and return the file back to you. Here's a JavaScript example of a complete storage and retrieval round trip using sd-cloud:

```javascript
// get uploaded files from a form
const fileInput = document.querySelector('input[type="file"]')

// store files and obtain a CID
const rootCid = await client.put(fileInput.files)

// retrieve files using the CID
const res = await client.get(rootCid)
const files = await res.files()
for (const file of files) {
  console.log(`${file.cid} ${file.name} ${file.size}`)
}
```

Copy

## sd-cloud CIDs under the hood

sd-cloud uses CIDs to make its free, decentralized file storage work, with help from [IPFS](https://ipfs.io/) and [Filecoin](https://filecoin.io/) for locating files and making sure they're always available.

Content addressing is the basis of the peer-to-peer hypermedia protocol IPFS (the InterPlanetary File System), which sd-cloud uses to locate files. When sd-cloud stores your data on IPFS, it can be retrieved from any IPFS node that has a copy of that data. This can make data transfers more efficient and reduce the load on any single node. As each user fetches a piece of data, they keep a local copy around to help other users who might request it later.

In addition to sd-cloud making it easy to get your data onto the content-addressed IPFS network, it also provides long-term persistence for your files using the decentralized Filecoin storage network. The Filecoin network incentivizes participants to provide storage space for files on the network — for more details, see the [concept guide to decentralized storage](https://sd-cloud/docs/concepts/decentralized-storage). **By combining IPFS and Filecoin storage into one easy-to-use service, sd-cloud makes it simple to store, locate, and retrieve your files on the decentralized web.**

# Decentralized storage in brief

sd-cloud relies on *decentralized storage* to store your files for free on the network. **Decentralized storage is a technique for storing data that, instead of traditional servers, uses a distributed network with many participants providing storage capacity.** This model inherently builds in redundancy that provides resilience against failure and attacks, as well as enhanced performance due to the geographical localization offered by a large network of distributed storage providers. While you don't need to understand decentralized storage to be able to incorporate sd-cloud in your apps and services, if you're curious about what's going on under the hood, read on.

## Content persistence

Broadly speaking, much of today's web operates using what is known as *location addressing*. Location addressing retrieves online information from specific locations on the web ─ i.e. from behind URLs.

```text
https://example.com/page-one.html
```

However, this approach has some critical problems. Location addressing is *centralized*, meaning that **whoever controls that location controls the content**. The controller can change the content, completely replace it, or just take it away. This means location-based addresses are vulnerable to attacks, exploitation, and loss.

One part of an approach to *decentralizing* this legacy way of operating the web entails implementing a new kind of addressing: [*content addressing*](https://sd-cloud/docs/concepts/content-addressing). Content addressing is the technique of issuing each piece of data a *content identifier (CID)*, which is a token derived directly from the file's contents using an algorithm that will always generate the same key for the same content. Using content addressing, files can be queried and retrieved based on *what they are*, not *where they are* — one major ingredient in enabling the web to break free from centralized content control. However, content addressing is only part of the solution.

sd-cloud uses CIDs generated by [IPFS](https://ipfs.io/), the InterPlanetary File System, to enable content addressing for all data stored in its network — however, **just because a file has a CID doesn't mean that the file is guaranteed to be around forever**. In a well-operating decentralized system, participants all need to agree to be good actors and provide reliable storage capacity. For this, sd-cloud uses the [Filecoin](https://filecoin.io/) network. The Filecoin network and its namesake token FIL (or ⨎ for short) were created to incentivize storage providers on the network to agree to *storage deals*. These deals specify that a certain amount of storage capacity will be provided over an agreed period of time, ensuring the second part of the solution: *content persistence*.

## Filecoin for verifiable content persistence

Leveraging the Filecoin network for data stored using sd-cloud ensures that content is available for retrieval, thus assuring that the content-based addressing provided by IPFS remains resilient over time. Filecoin achieves this mission using a number of methods, including [novel cryptography, consensus protocols, and game-theoretic incentives](https://filecoin.io/blog/posts/filecoin-features-verifiable-storage/) — but perhaps the most important of these is Filecoin's unique approach to storage verification.

Filecoin's storage verification system solves a previously intractable problem for decentralized storage: How can storage providers *prove* that they are really storing the data they say they are over time? Filecoin's [proving algorithms](https://filecoin.io/blog/posts/what-sets-us-apart-filecoin-s-proof-system/) take care of this verification:

- [*Proof-of-Replication*](https://proto.school/verifying-storage-on-filecoin/03) proves that a given storage provider is storing a unique copy of a client's original data.
- [*Proof-of-Spacetime*](https://proto.school/verifying-storage-on-filecoin/04) proves that the client's data is stored continuously over time.

In addition to this proof system, the Filecoin network also relies on *game-theoretic incentives* to discourage malicious or negligent activity. In order to become a Filecoin storage provider, all potential providers must provide collateral in the form of FIL when agreeing to a storage deal. Additionally, any storage provider that fails Proof-of-Spacetime checks is penalized, loses a portion of their collateral, and is eventually prevented from offering storage to clients again.

## Storing and monitoring with sd-cloud

How can you see these principles in action with your files uploaded to sd-cloud?

When you upload a file to sd-cloud using the `put()` method, you get the CID of that file in return. The file is then put into a queue for geographically distributed Filecoin network storage providers who have been chosen for performance and availability. These providers bid on the right to store the files in the queue — including your file — and agree to a storage deal.

You can monitor this activity for files you upload to sd-cloud by calling `status()` and providing a file's CID. This will return a list of deals that have been made at the time of query. Here's how you might include this call in your JavaScript project:

```javascript
// get files from form object
const fileInput = document.querySelector('input[type="file"]')

// store files, obtain CID
const rootCid = await client.put(fileInput.files, {
  name: 'my files',
  maxRetries: 3
})

// query status based on CID
const info = await client.status(rootCid)

// display results of query
console.log(`${info.cid} ${info.dagSize} ${info.created}`)
for (const deal of info.deals) {
  console.log(`${deal.id} -- ${deal.status}`)
}
```

## Summary

The legacy approach of using location addressing to reference files on the web has a number of critical vulnerabilities to interference, exploitation, and loss. Because whoever controls the location controls the content, these location-addressed, centrally stored networks also leave the web exposed to the whims of big, corporate central storage platforms.

By pairing IPFS content addressing (to decentralize how resources are specified) with Filecoin (to decentralize how storage capacity is obtained), it becomes possible to create a complete solution for locating, storing, and obtaining data — one that is not only resilient against these vulnerabilities, but also rewarding for network participants.

# sd-cloud economics

sd-cloud offers a simple interface that allows users and developers to take advantage of the vast array of [decentralized storage](https://sd-cloud/docs/concepts/decentralized-storage) provided by the [Filecoin](https://filecoin.io/) network. The unique economics of Filecoin allow sd-cloud to be completely **free to use**, while still ensuring that storage providers have a strong incentive to preserve user data for the long term.

Filecoin storage providers commit their hard drive capacity to the Filecoin network, and earn significant block rewards for doing so. This translates into real-world profits for storage providers, which incentivizes them to continue committing additional hard disk space to the Filecoin network.

However, when storage providers are storing data from Filecoin users, their likelihood of winning block rewards goes up by a big factor 一 **10x**! Because sd-cloud participates in the [Filecoin Plus](https://docs.filecoin.io/store/filecoin-plus/) program, all data uploaded through the service is eligible for this 10x reward multiplier. This is such a powerful incentive for Filecoin storage providers to store user data that they tend to be willing to offer free storage and retrieval services in order to get this block reward multiple.

As a result, most storage providers offer free storage and retrieval on Filecoin today and will continue to do so as long as block rewards continue to be a powerful incentive. This should be true for a very long time 一 for example, it is still the case that block rewards are powerful incentives for Bitcoin miners today.

While there is some additional infrastructure cost associated with running the sd-cloud service, [Protocol Labs](https://protocol.ai/) is committed to maintaining this infrastructure indefinitely as part of our mission to grow the decentralized storage ecosystem and preserve humanity's information for future generations.