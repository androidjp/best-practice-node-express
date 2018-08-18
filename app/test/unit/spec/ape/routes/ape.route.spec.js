'use strict';
const request = require('supertest');
const ExpressMonitor = require('../../../../../config/lib/monitor.express');
const app = ExpressMonitor.init();
const sinon = require('sinon');
const chai = require('chai');
const should = chai.should();
const ApeCmdService = require('../../../../../src/ape/services/ape.cmd.service');

describe('GET /api/ape/cmd/{cmdKey}', function () {

  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should return 404 when input wrong url path.', function (done) {
    request(app)
      .get('/api/ape/cmd/')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(404, done);
  });

  it('should return 200 and cmdList when input valid cmdKey.', function (done) {
    const mockCmdList = [
      {
        option: '拉取代码',
        cmd: 'git pull',
      },
    ];
    sandbox.stub(ApeCmdService, 'getCmdList').returns(mockCmdList);

    request(app)
      .get('/api/ape/cmd/git')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        const cmdList = res.body;
        should.exist(cmdList);
        cmdList.should.have.lengthOf(1);
        cmdList[0].option.should.equal('拉取代码');
        cmdList[0].cmd.should.equal('git pull');
        done();
      });
  });
});