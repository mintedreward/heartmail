/* global describe,it */
import { BlockHeader } from '../src/block-header.mjs'
import { Br } from '../src/br.mjs'
import { MerkleProof } from '../src/merkle-proof.mjs'
import { Tx } from '../src/tx.mjs'
import should from 'should'

describe('MerkleProof', () => {
  it('should satisfy this basic API', function () {
    const merkleProof = new MerkleProof()
    should.exist(merkleProof)
  })

  describe('#setFlagsHasTx', () => {
    it('should get and set has tx', () => {
      const merkleProof = new MerkleProof()
      merkleProof.getFlagsHasTx().should.equal(false)
      merkleProof.getFlagsProofType().should.equal('branch')
      merkleProof.getFlagsComposite().should.equal(false)
      merkleProof.getFlagsTargetType().should.equal('hash')
      merkleProof.setFlagsHasTx(true)
      merkleProof.getFlagsHasTx().should.equal(true)
      merkleProof.getFlagsProofType().should.equal('branch')
      merkleProof.getFlagsComposite().should.equal(false)
      merkleProof.getFlagsTargetType().should.equal('hash')
    })
  })

  describe('#setFlagsTargetType', () => {
    it('should get and set target type', () => {
      const merkleProof = new MerkleProof()
      merkleProof.getFlagsHasTx().should.equal(false)
      merkleProof.getFlagsProofType().should.equal('branch')
      merkleProof.getFlagsComposite().should.equal(false)
      merkleProof.getFlagsTargetType().should.equal('hash')

      merkleProof.setFlagsTargetType('hash')
      merkleProof.getFlagsHasTx().should.equal(false)
      merkleProof.getFlagsProofType().should.equal('branch')
      merkleProof.getFlagsComposite().should.equal(false)
      merkleProof.getFlagsTargetType().should.equal('hash')

      merkleProof.setFlagsTargetType('header')
      merkleProof.getFlagsHasTx().should.equal(false)
      merkleProof.getFlagsProofType().should.equal('branch')
      merkleProof.getFlagsComposite().should.equal(false)
      merkleProof.getFlagsTargetType().should.equal('header')

      merkleProof.setFlagsTargetType('merkleRoot')
      merkleProof.getFlagsHasTx().should.equal(false)
      merkleProof.getFlagsProofType().should.equal('branch')
      merkleProof.getFlagsComposite().should.equal(false)
      merkleProof.getFlagsTargetType().should.equal('merkleRoot')
    })
  })

  describe('#setFlagsTargetType', () => {
    it('should get and set target type', () => {
      const merkleProof = new MerkleProof()
      merkleProof.getFlagsHasTx().should.equal(false)
      merkleProof.getFlagsProofType().should.equal('branch')
      merkleProof.getFlagsComposite().should.equal(false)
      merkleProof.getFlagsTargetType().should.equal('hash')

      merkleProof.setFlagsProofType('branch')
      merkleProof.getFlagsHasTx().should.equal(false)
      merkleProof.getFlagsProofType().should.equal('branch')
      merkleProof.getFlagsComposite().should.equal(false)
      merkleProof.getFlagsTargetType().should.equal('hash')

      merkleProof.setFlagsProofType('tree')
      merkleProof.getFlagsHasTx().should.equal(false)
      merkleProof.getFlagsProofType().should.equal('tree')
      merkleProof.getFlagsComposite().should.equal(false)
      merkleProof.getFlagsTargetType().should.equal('hash')
    })
  })

  describe('#setFlagsComposite', () => {
    it('should get and set target type', () => {
      const merkleProof = new MerkleProof()
      merkleProof.getFlagsHasTx().should.equal(false)
      merkleProof.getFlagsProofType().should.equal('branch')
      merkleProof.getFlagsComposite().should.equal(false)
      merkleProof.getFlagsTargetType().should.equal('hash')

      merkleProof.setFlagsComposite(true)
      merkleProof.getFlagsHasTx().should.equal(false)
      merkleProof.getFlagsProofType().should.equal('branch')
      merkleProof.getFlagsComposite().should.equal(true)
      merkleProof.getFlagsTargetType().should.equal('hash')

      merkleProof.setFlagsComposite(false)
      merkleProof.getFlagsHasTx().should.equal(false)
      merkleProof.getFlagsProofType().should.equal('branch')
      merkleProof.getFlagsComposite().should.equal(false)
      merkleProof.getFlagsTargetType().should.equal('hash')
    })
  })

  describe('@fromBuffer', () => {
    it('should deserialize and serialize this test vector', () => {
      const merkleProofHex = '000cef65a4611570303539143dabd6aa64dbd0f41ed89074406dc0e7cd251cf1efff69f17b44cfe9c2a23285168fe05084e1254daa5305311ed8cd95b19ea6b0ed7505008e66d81026ddb2dae0bd88082632790fc6921b299ca798088bef5325a607efb9004d104f378654a25e35dbd6a539505a1e3ddbba7f92420414387bb5b12fc1c10f00472581a20a043cee55edee1c65dd6677e09903f22992062d8fd4b8d55de7b060006fcc978b3f999a3dbb85a6ae55edc06dd9a30855a030b450206c3646dadbd8c000423ab0273c2572880cdc0030034c72ec300ec9dd7bbc7d3f948a9d41b3621e39'
      const merkleProof = MerkleProof.fromHex(merkleProofHex)
      merkleProof.toHex().should.equal(merkleProofHex)
    })
  })

  describe('@fromJSON', () => {
    it('should deserialize and serialize this test vector', () => {
      const merkleProofJSONStr = `{
        "index": 12,
        "txOrId": "ffeff11c25cde7c06d407490d81ef4d0db64aad6ab3d14393530701561a465ef",
        "target": "75edb0a69eb195cdd81e310553aa4d25e18450e08f168532a2c2e9cf447bf169",
        "nodes": [
          "b9ef07a62553ef8b0898a79c291b92c60f7932260888bde0dab2dd2610d8668e",
          "0fc1c12fb1b57b38140442927fbadb3d1e5a5039a5d6db355ea25486374f104d",
          "60b0e75dd5b8d48f2d069229f20399e07766dd651ceeed55ee3c040aa2812547",
          "c0d8dbda46366c2050b430a05508a3d96dc0ed55aea685bb3d9a993f8b97cc6f",
          "391e62b3419d8a943f7dbc7bddc90e30ec724c033000dc0c8872253c27b03a42"
        ]
      }`
      const merkleProofJSON = JSON.parse(merkleProofJSONStr)
      const merkleProof = MerkleProof.fromJSON(merkleProofJSON)
      const merkleProofJSON2 = merkleProof.toJSON()
      merkleProofJSON.index.should.equal(merkleProofJSON2.index)
      merkleProofJSON.txOrId.should.equal(merkleProofJSON2.txOrId)
      merkleProofJSON.target.should.equal(merkleProofJSON2.target)
      merkleProofJSON.nodes[0].should.equal(merkleProofJSON2.nodes[0])
      merkleProofJSON.nodes[1].should.equal(merkleProofJSON2.nodes[1])
      merkleProofJSON.nodes[2].should.equal(merkleProofJSON2.nodes[2])
      merkleProofJSON.nodes[3].should.equal(merkleProofJSON2.nodes[3])
      merkleProofJSON.nodes[4].should.equal(merkleProofJSON2.nodes[4])
    })

    it('should make a round trip through buffers and back to json', () => {
      const merkleProofJSONStr = `{
        "index": 12,
        "txOrId": "ffeff11c25cde7c06d407490d81ef4d0db64aad6ab3d14393530701561a465ef",
        "target": "75edb0a69eb195cdd81e310553aa4d25e18450e08f168532a2c2e9cf447bf169",
        "nodes": [
          "b9ef07a62553ef8b0898a79c291b92c60f7932260888bde0dab2dd2610d8668e",
          "0fc1c12fb1b57b38140442927fbadb3d1e5a5039a5d6db355ea25486374f104d",
          "60b0e75dd5b8d48f2d069229f20399e07766dd651ceeed55ee3c040aa2812547",
          "c0d8dbda46366c2050b430a05508a3d96dc0ed55aea685bb3d9a993f8b97cc6f",
          "391e62b3419d8a943f7dbc7bddc90e30ec724c033000dc0c8872253c27b03a42"
        ]
      }`
      const merkleProofJSON = JSON.parse(merkleProofJSONStr)
      let merkleProof = MerkleProof.fromJSON(merkleProofJSON)
      merkleProof = merkleProof.fromBuffer(merkleProof.toBuffer())
      const merkleProofJSON2 = merkleProof.toJSON()
      merkleProofJSON.index.should.equal(merkleProofJSON2.index)
      merkleProofJSON.txOrId.should.equal(merkleProofJSON2.txOrId)
      merkleProofJSON.target.should.equal(merkleProofJSON2.target)
      merkleProofJSON.nodes[0].should.equal(merkleProofJSON2.nodes[0])
      merkleProofJSON.nodes[1].should.equal(merkleProofJSON2.nodes[1])
      merkleProofJSON.nodes[2].should.equal(merkleProofJSON2.nodes[2])
      merkleProofJSON.nodes[3].should.equal(merkleProofJSON2.nodes[3])
      merkleProofJSON.nodes[4].should.equal(merkleProofJSON2.nodes[4])
    })
  })

  describe('#verify', () => {
    it('should verify this test vector containing tx and blockheader', () => {
      const txHex = '0200000001080e8558d7af4763fef68042ef1e723d521948a0fb465237d5fb21fafb61f0580000000049483045022100fb4c94dc29cfa7423775443f8d8bb49b5814dcf709553345fcfad240efce22920220558569f97acd0d2b7bbe1954d570b9629ddf5491d9341867d7c41a8e6ee4ed2a41feffffff0200e1f505000000001976a914e296a740f5d9ecc22e0a74f9799f54ec44ee215a88ac80dc4a1f000000001976a914c993ce218b406cb71c60bad1f2be9469d91593cd88ac85020000'
      const blockHeaderHex = '000000208e33a53195acad0ab42ddbdbe3e4d9ca081332e5b01a62e340dbd8167d1a787b702f61bb913ac2063e0f2aed6d933d3386234da5c8eb9e30e498efd25fb7cb96fff12c60ffff7f2001000000'
      const tx = Tx.fromHex(txHex)
      const blockHeader = BlockHeader.fromHex(blockHeaderHex)
      const merkleProof = MerkleProof.fromJSON({
        targetType: 'header',
        proofType: 'branch',
        composite: false,
        index: 12,
        txOrId: txHex,
        target: blockHeaderHex,
        nodes: [
          'b9ef07a62553ef8b0898a79c291b92c60f7932260888bde0dab2dd2610d8668e',
          '0fc1c12fb1b57b38140442927fbadb3d1e5a5039a5d6db355ea25486374f104d',
          '60b0e75dd5b8d48f2d069229f20399e07766dd651ceeed55ee3c040aa2812547',
          'c0d8dbda46366c2050b430a05508a3d96dc0ed55aea685bb3d9a993f8b97cc6f',
          '391e62b3419d8a943f7dbc7bddc90e30ec724c033000dc0c8872253c27b03a42'
        ]
      })
      merkleProof.verify(blockHeader, tx).should.equal(true)
    })

    it('should verify this binary test vector containing tx and blockheader', () => {
      const txHex = '0200000001080e8558d7af4763fef68042ef1e723d521948a0fb465237d5fb21fafb61f0580000000049483045022100fb4c94dc29cfa7423775443f8d8bb49b5814dcf709553345fcfad240efce22920220558569f97acd0d2b7bbe1954d570b9629ddf5491d9341867d7c41a8e6ee4ed2a41feffffff0200e1f505000000001976a914e296a740f5d9ecc22e0a74f9799f54ec44ee215a88ac80dc4a1f000000001976a914c993ce218b406cb71c60bad1f2be9469d91593cd88ac85020000'
      const blockHeaderHex = '000000208e33a53195acad0ab42ddbdbe3e4d9ca081332e5b01a62e340dbd8167d1a787b702f61bb913ac2063e0f2aed6d933d3386234da5c8eb9e30e498efd25fb7cb96fff12c60ffff7f2001000000'
      const tx = Tx.fromHex(txHex)
      const blockHeader = BlockHeader.fromHex(blockHeaderHex)
      let merkleProof = MerkleProof.fromJSON({
        targetType: 'header',
        proofType: 'branch',
        composite: false,
        index: 12,
        txOrId: txHex,
        target: blockHeaderHex,
        nodes: [
          'b9ef07a62553ef8b0898a79c291b92c60f7932260888bde0dab2dd2610d8668e',
          '0fc1c12fb1b57b38140442927fbadb3d1e5a5039a5d6db355ea25486374f104d',
          '60b0e75dd5b8d48f2d069229f20399e07766dd651ceeed55ee3c040aa2812547',
          'c0d8dbda46366c2050b430a05508a3d96dc0ed55aea685bb3d9a993f8b97cc6f',
          '391e62b3419d8a943f7dbc7bddc90e30ec724c033000dc0c8872253c27b03a42'
        ]
      })
      merkleProof = MerkleProof.fromBuffer(merkleProof.toBuffer())
      merkleProof.verify(blockHeader, tx).should.equal(true)
    })

    it('should verify this test vector containing tx id and blockheader', () => {
      const txHex = '0200000001080e8558d7af4763fef68042ef1e723d521948a0fb465237d5fb21fafb61f0580000000049483045022100fb4c94dc29cfa7423775443f8d8bb49b5814dcf709553345fcfad240efce22920220558569f97acd0d2b7bbe1954d570b9629ddf5491d9341867d7c41a8e6ee4ed2a41feffffff0200e1f505000000001976a914e296a740f5d9ecc22e0a74f9799f54ec44ee215a88ac80dc4a1f000000001976a914c993ce218b406cb71c60bad1f2be9469d91593cd88ac85020000'
      const blockHeaderHex = '000000208e33a53195acad0ab42ddbdbe3e4d9ca081332e5b01a62e340dbd8167d1a787b702f61bb913ac2063e0f2aed6d933d3386234da5c8eb9e30e498efd25fb7cb96fff12c60ffff7f2001000000'
      const tx = Tx.fromHex(txHex)
      const blockHeader = BlockHeader.fromHex(blockHeaderHex)
      const merkleProof = MerkleProof.fromJSON({
        targetType: 'header',
        proofType: 'branch',
        composite: false,
        index: 12,
        txOrId: tx.id(),
        target: blockHeaderHex,
        nodes: [
          'b9ef07a62553ef8b0898a79c291b92c60f7932260888bde0dab2dd2610d8668e',
          '0fc1c12fb1b57b38140442927fbadb3d1e5a5039a5d6db355ea25486374f104d',
          '60b0e75dd5b8d48f2d069229f20399e07766dd651ceeed55ee3c040aa2812547',
          'c0d8dbda46366c2050b430a05508a3d96dc0ed55aea685bb3d9a993f8b97cc6f',
          '391e62b3419d8a943f7dbc7bddc90e30ec724c033000dc0c8872253c27b03a42'
        ]
      })
      merkleProof.verify(blockHeader, tx).should.equal(true)
    })

    it('should verify this binary test vector containing tx id and blockheader', () => {
      const txHex = '0200000001080e8558d7af4763fef68042ef1e723d521948a0fb465237d5fb21fafb61f0580000000049483045022100fb4c94dc29cfa7423775443f8d8bb49b5814dcf709553345fcfad240efce22920220558569f97acd0d2b7bbe1954d570b9629ddf5491d9341867d7c41a8e6ee4ed2a41feffffff0200e1f505000000001976a914e296a740f5d9ecc22e0a74f9799f54ec44ee215a88ac80dc4a1f000000001976a914c993ce218b406cb71c60bad1f2be9469d91593cd88ac85020000'
      const blockHeaderHex = '000000208e33a53195acad0ab42ddbdbe3e4d9ca081332e5b01a62e340dbd8167d1a787b702f61bb913ac2063e0f2aed6d933d3386234da5c8eb9e30e498efd25fb7cb96fff12c60ffff7f2001000000'
      const tx = Tx.fromHex(txHex)
      const blockHeader = BlockHeader.fromHex(blockHeaderHex)
      let merkleProof = MerkleProof.fromJSON({
        targetType: 'header',
        proofType: 'branch',
        composite: false,
        index: 12,
        txOrId: tx.id(),
        target: blockHeaderHex,
        nodes: [
          'b9ef07a62553ef8b0898a79c291b92c60f7932260888bde0dab2dd2610d8668e',
          '0fc1c12fb1b57b38140442927fbadb3d1e5a5039a5d6db355ea25486374f104d',
          '60b0e75dd5b8d48f2d069229f20399e07766dd651ceeed55ee3c040aa2812547',
          'c0d8dbda46366c2050b430a05508a3d96dc0ed55aea685bb3d9a993f8b97cc6f',
          '391e62b3419d8a943f7dbc7bddc90e30ec724c033000dc0c8872253c27b03a42'
        ]
      })
      merkleProof = MerkleProof.fromBuffer(merkleProof.toBuffer())
      merkleProof.verify(blockHeader, tx).should.equal(true)
    })

    it('should verify this test vector containing tx and merkle root', () => {
      const txHex = '0200000001080e8558d7af4763fef68042ef1e723d521948a0fb465237d5fb21fafb61f0580000000049483045022100fb4c94dc29cfa7423775443f8d8bb49b5814dcf709553345fcfad240efce22920220558569f97acd0d2b7bbe1954d570b9629ddf5491d9341867d7c41a8e6ee4ed2a41feffffff0200e1f505000000001976a914e296a740f5d9ecc22e0a74f9799f54ec44ee215a88ac80dc4a1f000000001976a914c993ce218b406cb71c60bad1f2be9469d91593cd88ac85020000'
      const blockHeaderHex = '000000208e33a53195acad0ab42ddbdbe3e4d9ca081332e5b01a62e340dbd8167d1a787b702f61bb913ac2063e0f2aed6d933d3386234da5c8eb9e30e498efd25fb7cb96fff12c60ffff7f2001000000'
      const tx = Tx.fromHex(txHex)
      const blockHeader = BlockHeader.fromHex(blockHeaderHex)
      const merkleProof = MerkleProof.fromJSON({
        targetType: 'merkleRoot',
        proofType: 'branch',
        composite: false,
        index: 12,
        txOrId: txHex,
        target: new Br(blockHeader.merkleRootBuf).readReverse().toString('hex'),
        nodes: [
          'b9ef07a62553ef8b0898a79c291b92c60f7932260888bde0dab2dd2610d8668e',
          '0fc1c12fb1b57b38140442927fbadb3d1e5a5039a5d6db355ea25486374f104d',
          '60b0e75dd5b8d48f2d069229f20399e07766dd651ceeed55ee3c040aa2812547',
          'c0d8dbda46366c2050b430a05508a3d96dc0ed55aea685bb3d9a993f8b97cc6f',
          '391e62b3419d8a943f7dbc7bddc90e30ec724c033000dc0c8872253c27b03a42'
        ]
      })
      merkleProof.verify(blockHeader, tx).should.equal(true)
    })

    it('should verify this binary test vector containing tx and merkle root', () => {
      const txHex = '0200000001080e8558d7af4763fef68042ef1e723d521948a0fb465237d5fb21fafb61f0580000000049483045022100fb4c94dc29cfa7423775443f8d8bb49b5814dcf709553345fcfad240efce22920220558569f97acd0d2b7bbe1954d570b9629ddf5491d9341867d7c41a8e6ee4ed2a41feffffff0200e1f505000000001976a914e296a740f5d9ecc22e0a74f9799f54ec44ee215a88ac80dc4a1f000000001976a914c993ce218b406cb71c60bad1f2be9469d91593cd88ac85020000'
      const blockHeaderHex = '000000208e33a53195acad0ab42ddbdbe3e4d9ca081332e5b01a62e340dbd8167d1a787b702f61bb913ac2063e0f2aed6d933d3386234da5c8eb9e30e498efd25fb7cb96fff12c60ffff7f2001000000'
      const tx = Tx.fromHex(txHex)
      const blockHeader = BlockHeader.fromHex(blockHeaderHex)
      let merkleProof = MerkleProof.fromJSON({
        targetType: 'merkleRoot',
        proofType: 'branch',
        composite: false,
        index: 12,
        txOrId: txHex,
        target: new Br(blockHeader.merkleRootBuf).readReverse().toString('hex'),
        nodes: [
          'b9ef07a62553ef8b0898a79c291b92c60f7932260888bde0dab2dd2610d8668e',
          '0fc1c12fb1b57b38140442927fbadb3d1e5a5039a5d6db355ea25486374f104d',
          '60b0e75dd5b8d48f2d069229f20399e07766dd651ceeed55ee3c040aa2812547',
          'c0d8dbda46366c2050b430a05508a3d96dc0ed55aea685bb3d9a993f8b97cc6f',
          '391e62b3419d8a943f7dbc7bddc90e30ec724c033000dc0c8872253c27b03a42'
        ]
      })
      merkleProof = MerkleProof.fromBuffer(merkleProof.toBuffer())
      merkleProof.verify(blockHeader, tx).should.equal(true)
    })

    it('should verify this test vector containing tx id and merkle root', () => {
      const txHex = '0200000001080e8558d7af4763fef68042ef1e723d521948a0fb465237d5fb21fafb61f0580000000049483045022100fb4c94dc29cfa7423775443f8d8bb49b5814dcf709553345fcfad240efce22920220558569f97acd0d2b7bbe1954d570b9629ddf5491d9341867d7c41a8e6ee4ed2a41feffffff0200e1f505000000001976a914e296a740f5d9ecc22e0a74f9799f54ec44ee215a88ac80dc4a1f000000001976a914c993ce218b406cb71c60bad1f2be9469d91593cd88ac85020000'
      const blockHeaderHex = '000000208e33a53195acad0ab42ddbdbe3e4d9ca081332e5b01a62e340dbd8167d1a787b702f61bb913ac2063e0f2aed6d933d3386234da5c8eb9e30e498efd25fb7cb96fff12c60ffff7f2001000000'
      const tx = Tx.fromHex(txHex)
      const blockHeader = BlockHeader.fromHex(blockHeaderHex)
      const merkleProof = MerkleProof.fromJSON({
        targetType: 'merkleRoot',
        proofType: 'branch',
        composite: false,
        index: 12,
        txOrId: tx.id(),
        target: new Br(blockHeader.merkleRootBuf).readReverse().toString('hex'),
        nodes: [
          'b9ef07a62553ef8b0898a79c291b92c60f7932260888bde0dab2dd2610d8668e',
          '0fc1c12fb1b57b38140442927fbadb3d1e5a5039a5d6db355ea25486374f104d',
          '60b0e75dd5b8d48f2d069229f20399e07766dd651ceeed55ee3c040aa2812547',
          'c0d8dbda46366c2050b430a05508a3d96dc0ed55aea685bb3d9a993f8b97cc6f',
          '391e62b3419d8a943f7dbc7bddc90e30ec724c033000dc0c8872253c27b03a42'
        ]
      })
      merkleProof.verify(blockHeader, tx).should.equal(true)
    })

    it('should verify this binary test vector containing tx id and merkle root', () => {
      const txHex = '0200000001080e8558d7af4763fef68042ef1e723d521948a0fb465237d5fb21fafb61f0580000000049483045022100fb4c94dc29cfa7423775443f8d8bb49b5814dcf709553345fcfad240efce22920220558569f97acd0d2b7bbe1954d570b9629ddf5491d9341867d7c41a8e6ee4ed2a41feffffff0200e1f505000000001976a914e296a740f5d9ecc22e0a74f9799f54ec44ee215a88ac80dc4a1f000000001976a914c993ce218b406cb71c60bad1f2be9469d91593cd88ac85020000'
      const blockHeaderHex = '000000208e33a53195acad0ab42ddbdbe3e4d9ca081332e5b01a62e340dbd8167d1a787b702f61bb913ac2063e0f2aed6d933d3386234da5c8eb9e30e498efd25fb7cb96fff12c60ffff7f2001000000'
      const tx = Tx.fromHex(txHex)
      const blockHeader = BlockHeader.fromHex(blockHeaderHex)
      let merkleProof = MerkleProof.fromJSON({
        targetType: 'merkleRoot',
        proofType: 'branch',
        composite: false,
        index: 12,
        txOrId: tx.id(),
        target: new Br(blockHeader.merkleRootBuf).readReverse().toString('hex'),
        nodes: [
          'b9ef07a62553ef8b0898a79c291b92c60f7932260888bde0dab2dd2610d8668e',
          '0fc1c12fb1b57b38140442927fbadb3d1e5a5039a5d6db355ea25486374f104d',
          '60b0e75dd5b8d48f2d069229f20399e07766dd651ceeed55ee3c040aa2812547',
          'c0d8dbda46366c2050b430a05508a3d96dc0ed55aea685bb3d9a993f8b97cc6f',
          '391e62b3419d8a943f7dbc7bddc90e30ec724c033000dc0c8872253c27b03a42'
        ]
      })
      merkleProof = MerkleProof.fromBuffer(merkleProof.toBuffer())
      merkleProof.verify(blockHeader, tx).should.equal(true)
    })

    it('should (not) verify this test vector containing tx id and hash', () => {
      // there is no reason to use this method, so we disable it. always deliver
      // the merkle root.
      const txHex = '0200000001080e8558d7af4763fef68042ef1e723d521948a0fb465237d5fb21fafb61f0580000000049483045022100fb4c94dc29cfa7423775443f8d8bb49b5814dcf709553345fcfad240efce22920220558569f97acd0d2b7bbe1954d570b9629ddf5491d9341867d7c41a8e6ee4ed2a41feffffff0200e1f505000000001976a914e296a740f5d9ecc22e0a74f9799f54ec44ee215a88ac80dc4a1f000000001976a914c993ce218b406cb71c60bad1f2be9469d91593cd88ac85020000'
      const blockHeaderHex = '000000208e33a53195acad0ab42ddbdbe3e4d9ca081332e5b01a62e340dbd8167d1a787b702f61bb913ac2063e0f2aed6d933d3386234da5c8eb9e30e498efd25fb7cb96fff12c60ffff7f2001000000'
      const tx = Tx.fromHex(txHex)
      const blockHeader = BlockHeader.fromHex(blockHeaderHex)
      const merkleProof = MerkleProof.fromJSON({
        targetType: 'hash',
        proofType: 'branch',
        composite: false,
        index: 12,
        txOrId: tx.id(),
        target: '00'.repeat(32), // fake block hash
        nodes: [
          'b9ef07a62553ef8b0898a79c291b92c60f7932260888bde0dab2dd2610d8668e',
          '0fc1c12fb1b57b38140442927fbadb3d1e5a5039a5d6db355ea25486374f104d',
          '60b0e75dd5b8d48f2d069229f20399e07766dd651ceeed55ee3c040aa2812547',
          'c0d8dbda46366c2050b430a05508a3d96dc0ed55aea685bb3d9a993f8b97cc6f',
          '391e62b3419d8a943f7dbc7bddc90e30ec724c033000dc0c8872253c27b03a42'
        ]
      })
      merkleProof.verify(blockHeader, tx).should.equal(false)
    })

    it('should (not) verify this binary test vector containing tx id and hash', () => {
      // there is no reason to use this method, so we disable it. always deliver
      // the merkle root.
      const txHex = '0200000001080e8558d7af4763fef68042ef1e723d521948a0fb465237d5fb21fafb61f0580000000049483045022100fb4c94dc29cfa7423775443f8d8bb49b5814dcf709553345fcfad240efce22920220558569f97acd0d2b7bbe1954d570b9629ddf5491d9341867d7c41a8e6ee4ed2a41feffffff0200e1f505000000001976a914e296a740f5d9ecc22e0a74f9799f54ec44ee215a88ac80dc4a1f000000001976a914c993ce218b406cb71c60bad1f2be9469d91593cd88ac85020000'
      const blockHeaderHex = '000000208e33a53195acad0ab42ddbdbe3e4d9ca081332e5b01a62e340dbd8167d1a787b702f61bb913ac2063e0f2aed6d933d3386234da5c8eb9e30e498efd25fb7cb96fff12c60ffff7f2001000000'
      const tx = Tx.fromHex(txHex)
      const blockHeader = BlockHeader.fromHex(blockHeaderHex)
      let merkleProof = MerkleProof.fromJSON({
        targetType: 'hash',
        proofType: 'branch',
        composite: false,
        index: 12,
        txOrId: tx.id(),
        target: '00'.repeat(32), // fake block hash
        nodes: [
          'b9ef07a62553ef8b0898a79c291b92c60f7932260888bde0dab2dd2610d8668e',
          '0fc1c12fb1b57b38140442927fbadb3d1e5a5039a5d6db355ea25486374f104d',
          '60b0e75dd5b8d48f2d069229f20399e07766dd651ceeed55ee3c040aa2812547',
          'c0d8dbda46366c2050b430a05508a3d96dc0ed55aea685bb3d9a993f8b97cc6f',
          '391e62b3419d8a943f7dbc7bddc90e30ec724c033000dc0c8872253c27b03a42'
        ]
      })
      merkleProof = MerkleProof.fromBuffer(merkleProof.toBuffer())
      merkleProof.verify(blockHeader, tx).should.equal(false)
    })

    it('should verify this uneven test vector containing tx id and merkleRoot', () => {
      // there is no reason to use this method, so we disable it. always deliver
      // the merkle root.
      const txId = '75edb0a69eb195cdd81e310553aa4d25e18450e08f168532a2c2e9cf447bf169'
      const merkleRootId = '6c9d85bf51ebb0c474616fad91a115590e9a8316f21cab836dc949cfa267b0a7'
      const tx = { hash: () => new Br(Buffer.from(txId, 'hex')).readReverse() }
      const blockHeader = { merkleRootBuf: new Br(Buffer.from(merkleRootId, 'hex')).readReverse() }
      const merkleProof = MerkleProof.fromJSON({
        index: 2,
        targetType: 'merkleRoot',
        txOrId: txId,
        target: merkleRootId,
        nodes: [
          '*',
          '0afecafecafecafecafecafecafecafecafecafecafecafecafecafecafecafe',
          '1afecafecafecafecafecafecafecafecafecafecafecafecafecafecafecafe'
        ]
      })
      merkleProof.verify(blockHeader, tx).should.equal(true)
    })

    it('should verify this uneven binary test vector containing tx id and merkleRoot', () => {
      // there is no reason to use this method, so we disable it. always deliver
      // the merkle root.
      const txId = '75edb0a69eb195cdd81e310553aa4d25e18450e08f168532a2c2e9cf447bf169'
      const merkleRootId = '6c9d85bf51ebb0c474616fad91a115590e9a8316f21cab836dc949cfa267b0a7'
      const tx = { hash: () => new Br(Buffer.from(txId, 'hex')).readReverse() }
      const blockHeader = { merkleRootBuf: new Br(Buffer.from(merkleRootId, 'hex')).readReverse() }
      let merkleProof = MerkleProof.fromJSON({
        index: 2,
        targetType: 'merkleRoot',
        txOrId: txId,
        target: merkleRootId,
        nodes: [
          '*',
          '0afecafecafecafecafecafecafecafecafecafecafecafecafecafecafecafe',
          '1afecafecafecafecafecafecafecafecafecafecafecafecafecafecafecafe'
        ]
      })
      merkleProof = MerkleProof.fromBuffer(merkleProof.toBuffer())
      merkleProof.verify(blockHeader, tx).should.equal(true)
    })
  })
})
