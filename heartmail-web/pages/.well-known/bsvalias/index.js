export const getServerSideProps  = async ({ res }) => {
  if (res) {
    const data = {
      "capabilities": {
        "api-documentation": "https://github.com/heartmail/heartmail/blob/master/heartmail-docs/README.md",
        "pki": `${process.env.NEXT_PUBLIC_URL}/api/pki/{alias}@{domain.tld}`,
        "a9f510c16bde": `${process.env.NEXT_PUBLIC_URL}/api/verify-pki/{alias}@{domain.tld}/{pubkey}`,
        "2a40af698840": `${process.env.NEXT_PUBLIC_URL}/api/get-payment-terms/{alias}@{domain.tld}`,
        "5f1323cddf31": `${process.env.NEXT_PUBLIC_URL}/api/send-payment/{alias}@{domain.tld}`
      }
    }

    res.setHeader('Content-Type', 'application/json')
    res.write(JSON.stringify(data, undefined, 2))
    res.end()
  }
  return {
    props: {},
  }
}

export default () => {}
