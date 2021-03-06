# Word Hierarchy

This is a very basic tool inspired by [this instagram post](https://www.instagram.com/p/BWxtIxChcB3/) from the book [the Emoji Code](https://www.vyvevans.net/the-emoji-code)

The intention is to build similar hierarchies of words. Pretty simple.

I'm using the same hierarchy as in the post/book as an example of how it works.

See a [sample of the tool](https://xferguson.github.io/wordhierarchy/).

## Structure

To simplify the data schema, I have used nested arrays and objects such that a word is an object with key `word` is a string and key `children` is an array of word objects, or null if empty. `word == wordText` and `children == ArrayOfWordObjects` as follows:

`````
data = [
	{
		word: '',
		children: [
			{
				word: '',
				children: [
					{
						word: '',
						children: null
					},
					{...},
				]
			},
			{...},
		]
	},
	{...},
]
`````

## Installation

All files are already included in order to display the page by merely navigating to index.html

## Development

Packages are managed with node. In order to install packages for development, simply run `npm install`

## Needs

- The site is only guaranteed to work down to a browser width of 600px. It is possible that errors or issue will show up below that. So adding some responsiveness may be necessary.
- The JSX is transformed with the in-browser transformer at the moment (`babel.min.js`). A precompiler should be added
- There is no linting or compression/uglification set up
