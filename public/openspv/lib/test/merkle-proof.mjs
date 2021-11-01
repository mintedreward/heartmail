/* global describe,it */
'use strict'
import { MerkleProof } from '../src/merkle-proof.mjs'
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
})
