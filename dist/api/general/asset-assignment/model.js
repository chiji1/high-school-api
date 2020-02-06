"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.schema = exports.schemaUpdate = exports.schemaCreate = undefined;

var _joi = require("joi");

var _joi2 = _interopRequireDefault(_joi);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseCsv = require("mongoose-csv");

var _mongooseCsv2 = _interopRequireDefault(_mongooseCsv);

var _constants = require("../../../constants");

var _model = require("../staff/model");

var _model2 = _interopRequireDefault(_model);

var _model3 = require("../asset/model");

var _model4 = _interopRequireDefault(_model3);

var _model5 = require("../vehicle/model");

var _model6 = _interopRequireDefault(_model5);

var _model7 = require("../task/model");

var _model8 = _interopRequireDefault(_model7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line camelcase
/* eslint-disable import/no-cycle */
/**
 * @author 4Dcoder
 * @property {Number} id AssetAssignment ObjectId primaryKey
 * @property {String} user_type AssetAssignment user_type "STAFF|PARTNER" (required)
 * @property {String} staff_id AssetAssignment staff_id (optional)
 * @property {String} partner_id AssetAssignment partner_id (optional)
 * @property {Date} request_date AssetAssignment request_date (optional)
 * @property {String} task_id AssetAssignment task_id (optional)
 * @property {String} asset_type AssetAssignment asset_type "VEHICLE|INVENTORY" (required)
 * @property {String} vehicle_id AssetAssignment vehicle_id (optional)
 * @property {String} asset_id AssetAssignment asset_id (optional)
 * @property {Date} issued_date AssetAssignment issued_date (optional)
 * @property {String} issued_by AssetAssignment issued_by (optional)
 * @property {String} issuer_remark AssetAssignment issuer_remark (optional)
 * @property {String} request_status AssetAssignment request_status
 *  "PENDING|COLLECTED|REVOKED"PENDING" optional)
 * @property {String} assignment_status AssetAssignment assignment_status
 *  "PENDING|APPROVED|ISSUED|COLLECTED|REJECTED" (optional)
 * @property {Boolean} is_returnable AssetAssignment is_returnable (optional)
 * @property {Date} expected_returned_date AssetAssignment expected_returned_date (optional)
 * @property {Date} actual_returned_date AssetAssignment actual_returned_date (optional)
 * @property {Date} collected_date AssetAssignment collected_date (optional)
 * @property {String} collected_by AssetAssignment collected_by (optional)
 * @property {String} collected_remark AssetAssignment collected_remark (optional)
 * @description AssetAssignment model holds record of all inventories and vehicles
 *  assignments. The Staff or driver may revoke and unfulfilled request.
 *  The Asset Manager can reject a pending request. Once request are collected,
 *  then it can be re-issued. For multiple assets, multiple request should be made
 *  to track them individually.
 */
var Schema = _mongoose2.default.Schema;
var ObjectId = Schema.Types.ObjectId;
var schemaCreate = exports.schemaCreate = {
    user_type: _joi2.default.string().trim().valid(["STAFF", "PARTNER"]).required(),
    staff_id: _joi2.default.string().optional(),
    partner_id: _joi2.default.string().optional(),
    request_date: _joi2.default.date().optional(),
    task_id: _joi2.default.string().optional(),
    asset_type: _joi2.default.string().trim().valid(["VEHICLE", "INVENTORY"]).required(),
    vehicle_id: _joi2.default.string().optional(),
    asset_id: _joi2.default.string().optional(),
    issued_date: _joi2.default.date().optional(),
    issued_by: _joi2.default.string().optional(),
    issuer_remark: _joi2.default.string().optional(),
    request_status: _joi2.default.string().trim().valid(["PENDING", "COLLECTED", "REVOKED"]).optional(),
    assignment_status: _joi2.default.string().trim().valid(["PENDING", "APPROVED", "ISSUED", "COLLECTED", "REJECTED"]).optional(),
    is_returnable: _joi2.default.boolean().optional(),
    expected_returned_date: _joi2.default.date().optional(),
    actual_returned_date: _joi2.default.date().optional(),
    collected_date: _joi2.default.date().optional(),
    collected_by: _joi2.default.string().optional(),
    collected_remark: _joi2.default.string().optional(),
    created_by: _joi2.default.string().required()
};

var schemaUpdate = exports.schemaUpdate = {
    user_type: _joi2.default.string().valid(["STAFF", "PARTNER"]).optional(),
    staff_id: _joi2.default.string().optional(),
    partner_id: _joi2.default.string().optional(),
    request_date: _joi2.default.date().optional(),
    task_id: _joi2.default.string().optional(),
    asset_type: _joi2.default.string().valid(["VEHICLE", "INVENTORY"]).optional(),
    vehicle_id: _joi2.default.string().optional(),
    asset_id: _joi2.default.string().optional(),
    issued_date: _joi2.default.date().optional(),
    issued_by: _joi2.default.string().optional(),
    issuer_remark: _joi2.default.string().optional(),
    request_status: _joi2.default.string().valid(["PENDING", "COLLECTED", "REVOKED"]).optional(),
    assignment_status: _joi2.default.string().valid(["PENDING", "APPROVED", "ISSUED", "COLLECTED", "REJECTED"]).optional(),
    is_returnable: _joi2.default.boolean().optional(),
    expected_returned_date: _joi2.default.date().optional(),
    actual_returned_date: _joi2.default.date().optional(),
    collected_date: _joi2.default.date().optional(),
    collected_by: _joi2.default.string().optional(),
    collected_remark: _joi2.default.string().optional(),
    updated_by: _joi2.default.string().required()
};

var schema = exports.schema = {
    user_type: { type: String, enum: ["STAFF", "PARTNER"], required: true },
    staff_id: { type: ObjectId, ref: "Staff" },
    partner_id: { type: ObjectId, ref: "Partner" },
    request_date: { type: Date }, // desired date to receive to have the request granted
    task_id: { type: ObjectId, ref: "Task" },
    asset_type: { type: String, enum: ["VEHICLE", "INVENTORY"], required: true },
    vehicle_id: { type: ObjectId, ref: "Vehicle" },
    asset_id: { type: ObjectId, ref: "Asset" },
    issued_date: { type: Date },
    issued_by: { type: ObjectId, ref: "Staff" },
    issuer_remark: { type: String },
    request_status: {
        type: String,
        enum: ["PENDING", "COLLECTED", "REVOKED"],
        required: [true, "Why no input?"],
        default: "PENDING"
    },
    assignment_status: {
        type: String,
        enum: ["PENDING", "APPROVED", "ISSUED", "COLLECTED", "REJECTED"],
        required: [true, "Why no input?"],
        default: "PENDING"
    },
    is_returnable: { type: Boolean, required: [true, "Why no input?"], default: true },
    expected_returned_date: { type: Date },
    actual_returned_date: { type: Date },
    collected_date: { type: Date },
    collected_by: { type: ObjectId, ref: "Staff" }, // Staff to received the returned asset
    collected_remark: { type: String },
    created_by: { type: ObjectId, required: true, ref: "Staff" },
    updated_by: { type: ObjectId, ref: "Staff" }
};

var options = _constants.DATABASE.OPTIONS;

var newSchema = new Schema(schema, options);
newSchema.set("collection", "asset_assignment");

var AssetAssignment = _mongoose2.default.model("AssetAssignment", newSchema);

exports.default = AssetAssignment;
//# sourceMappingURL=model.js.map