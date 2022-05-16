export const getServerSideProps  = async ({ res }) => {
  if (res) {
    
    // See the following for further development:
    // https://bsvalias.org/04-01-basic-address-resolution.html
    // https://github.com/openspv/openspv/blob/1ae6ecbf4865bc21e23c51e3dcd6a6940712a20c/sbw-specs/sbw-121-keyfile-brfc.md
    // https://github.com/openspv/openspv/blob/19f80dd643533e184c3c1261175d4f5fec05e10b/sbw-specs/sbw-002-email2-identity-keys.md
    // https://github.com/openspv/openspv/blob/eb07a01deffaec8040bd3eebbd0f76a5fd023a5d/sbw-specs/sbw-003-email2-verify-public-key-owner.md

    const data = {
      "bsvalias": "1.0",
      "capabilities": {
        "{{fm:brfc}}": "https://example.bsvalias.tld/api/{alias}@{domain.tld}/keyfile"
      }
    }
    
    res.setHeader('Content-Type', 'application/json')
    res.write(JSON.stringify(data))
    res.end()
  }
  return {
    props: {},
  }
}

export default () => {}
