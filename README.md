# Word Hierarchy

This is a very basic tool inspired by [this instagram post](https://www.instagram.com/p/BWxtIxChcB3/) from the book [the Emoji Code](https://www.vyvevans.net/the-emoji-code)

The intention is to build similar hierarchies of words. Pretty simple.

I'm using the same hierarchy as in the post/book as an example of how it works.

## Structure

To simplify the data schema, I have used nested arrays and objects such that a word is an object `key = wordText` and `attribute == ArrayOfWordObjects` as follows:

`````
data = [
	{word: [
			{word: [
					{word},
					{...},
				]
			},
			{...},
		]
	},
	{...},
]
`````