---
layout: post
authors: [jens_gheerardyn]
title: 'The Blockchain, how does it work?'
image: /img/blockchain/blockchain-header.jpg
tags: [Blockchain, internals]
category: Blockchain
comments: true
---


> You have probably heard about the Blockchain, but how does it actually work on a technical bases?

# Topics
Step by step we will dive a little deeper into how the blockchain works:
1. [Introduction](#introduction)
1. [SHA256 Hash](#sha256-hash)
2. [Block](#block)
3. [Blockchain](bBlockchain)
4. [Distributed](#distributed)
5. [Tokens](#tokens)
6. [Coinbase](#coinbase)
7. [Bitcoin](#bitcoin)

# Introduction
What is the blockchain? 

> Blockchain is a type of distributed ledger or decentralized database that keeps permanent records of digital transactions.

A blockchain exists out of multiple machines, called nodes. All the nodes store the same copy of digital transaction data.
Transactions are bundled and concantenated into a block before being distributed to all the nodes.
There is no central authority that is responsible for the transactions, all the nodes combined decide if they append it to the existing chain of blocks.

The stored data is permanent or immutable, meaning only data can be added and if some mistake was made it cannot be undone. If you did made a mistake your only option is to compensate for it. A distributed database means that we do not have control over the data, we need to prevent others from tampering with the data. Especially when we read that it is a ledger for digital transactions, the data needs to be integer. 

Apart from that the blockchain needs protection from repudiation attacks. A repudiation attack is the possibility for a person to deny that they performed a specific action.

Now let us go dive into some more detail.

# SHA256 Hash

<div class="row" style="margin: 2.5rem 0;">
<div class="4u">
{% include image.html img="/img/blockchain/variable-size-to-fixed-size.jpg" alt="Hash algorithm - variable size to fixed size" title="Hash algorithm - variable size to fixed size" %}
</div>
<div class="1u">&nbsp;</div>
<div class="7u">
In order to prevent tampering with the data we need some sort of validation. A hash or more specific a cryptographic hash function can map data from an arbitrary size to a fixed size. Such a function is also called a non-ivertible or a one-way function. The input will always generate the same output but you cannot figure out the input from the output, hence the term one-way. 
</div>
</div>


# Block
PlaceHolder

# Blockchain
Placeholder

# Distributed
Placeholder

# Tokens
Placeholder

# Coinbase
Placeholder

# Bitcoin
Placeholder