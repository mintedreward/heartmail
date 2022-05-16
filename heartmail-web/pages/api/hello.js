// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler (req, res) {
  res.status(200).json({ name: 'John Doe' })
}

/*
API needs to:

Affiliate:
- <del>Retrieve affiliate information</del> - handled automatically in the
  front-end without an API component

Payment:
- Accept and verify money button payment for early access
- Generate a new key & account

View:
- Retrieve information for a key
- Retrieve information for an account
*/
