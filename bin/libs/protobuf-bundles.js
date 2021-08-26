var $protobuf = window.protobuf;
$protobuf.roots.default=window;
// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.activity = (function() {

    /**
     * Namespace activity.
     * @exports activity
     * @namespace
     */
    var activity = {};

    activity.ActivityDto = (function() {

        /**
         * Properties of an ActivityDto.
         * @memberof activity
         * @interface IActivityDto
         * @property {string} id ActivityDto id
         * @property {string} params ActivityDto params
         */

        /**
         * Constructs a new ActivityDto.
         * @memberof activity
         * @classdesc Represents an ActivityDto.
         * @implements IActivityDto
         * @constructor
         * @param {activity.IActivityDto=} [properties] Properties to set
         */
        function ActivityDto(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ActivityDto id.
         * @member {string} id
         * @memberof activity.ActivityDto
         * @instance
         */
        ActivityDto.prototype.id = "";

        /**
         * ActivityDto params.
         * @member {string} params
         * @memberof activity.ActivityDto
         * @instance
         */
        ActivityDto.prototype.params = "";

        /**
         * Creates a new ActivityDto instance using the specified properties.
         * @function create
         * @memberof activity.ActivityDto
         * @static
         * @param {activity.IActivityDto=} [properties] Properties to set
         * @returns {activity.ActivityDto} ActivityDto instance
         */
        ActivityDto.create = function create(properties) {
            return new ActivityDto(properties);
        };

        /**
         * Encodes the specified ActivityDto message. Does not implicitly {@link activity.ActivityDto.verify|verify} messages.
         * @function encode
         * @memberof activity.ActivityDto
         * @static
         * @param {activity.IActivityDto} message ActivityDto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ActivityDto.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.params);
            return writer;
        };

        /**
         * Encodes the specified ActivityDto message, length delimited. Does not implicitly {@link activity.ActivityDto.verify|verify} messages.
         * @function encodeDelimited
         * @memberof activity.ActivityDto
         * @static
         * @param {activity.IActivityDto} message ActivityDto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ActivityDto.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an ActivityDto message from the specified reader or buffer.
         * @function decode
         * @memberof activity.ActivityDto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {activity.ActivityDto} ActivityDto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ActivityDto.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.activity.ActivityDto();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.params = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("id"))
                throw $util.ProtocolError("missing required 'id'", { instance: message });
            if (!message.hasOwnProperty("params"))
                throw $util.ProtocolError("missing required 'params'", { instance: message });
            return message;
        };

        /**
         * Decodes an ActivityDto message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof activity.ActivityDto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {activity.ActivityDto} ActivityDto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ActivityDto.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ActivityDto message.
         * @function verify
         * @memberof activity.ActivityDto
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ActivityDto.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isString(message.id))
                return "id: string expected";
            if (!$util.isString(message.params))
                return "params: string expected";
            return null;
        };

        return ActivityDto;
    })();

    return activity;
})();

$root.bag = (function() {

    /**
     * Namespace bag.
     * @exports bag
     * @namespace
     */
    var bag = {};

    bag.BagDto = (function() {

        /**
         * Properties of a BagDto.
         * @memberof bag
         * @interface IBagDto
         * @property {string} id BagDto id
         * @property {string} params BagDto params
         */

        /**
         * Constructs a new BagDto.
         * @memberof bag
         * @classdesc Represents a BagDto.
         * @implements IBagDto
         * @constructor
         * @param {bag.IBagDto=} [properties] Properties to set
         */
        function BagDto(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BagDto id.
         * @member {string} id
         * @memberof bag.BagDto
         * @instance
         */
        BagDto.prototype.id = "";

        /**
         * BagDto params.
         * @member {string} params
         * @memberof bag.BagDto
         * @instance
         */
        BagDto.prototype.params = "";

        /**
         * Creates a new BagDto instance using the specified properties.
         * @function create
         * @memberof bag.BagDto
         * @static
         * @param {bag.IBagDto=} [properties] Properties to set
         * @returns {bag.BagDto} BagDto instance
         */
        BagDto.create = function create(properties) {
            return new BagDto(properties);
        };

        /**
         * Encodes the specified BagDto message. Does not implicitly {@link bag.BagDto.verify|verify} messages.
         * @function encode
         * @memberof bag.BagDto
         * @static
         * @param {bag.IBagDto} message BagDto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BagDto.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.params);
            return writer;
        };

        /**
         * Encodes the specified BagDto message, length delimited. Does not implicitly {@link bag.BagDto.verify|verify} messages.
         * @function encodeDelimited
         * @memberof bag.BagDto
         * @static
         * @param {bag.IBagDto} message BagDto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BagDto.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BagDto message from the specified reader or buffer.
         * @function decode
         * @memberof bag.BagDto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {bag.BagDto} BagDto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BagDto.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.bag.BagDto();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.params = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("id"))
                throw $util.ProtocolError("missing required 'id'", { instance: message });
            if (!message.hasOwnProperty("params"))
                throw $util.ProtocolError("missing required 'params'", { instance: message });
            return message;
        };

        /**
         * Decodes a BagDto message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof bag.BagDto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {bag.BagDto} BagDto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BagDto.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BagDto message.
         * @function verify
         * @memberof bag.BagDto
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BagDto.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isString(message.id))
                return "id: string expected";
            if (!$util.isString(message.params))
                return "params: string expected";
            return null;
        };

        return BagDto;
    })();

    return bag;
})();

$root.login = (function() {

    /**
     * Namespace login.
     * @exports login
     * @namespace
     */
    var login = {};

    login.LoginDto = (function() {

        /**
         * Properties of a LoginDto.
         * @memberof login
         * @interface ILoginDto
         * @property {string} id LoginDto id
         * @property {string} params LoginDto params
         */

        /**
         * Constructs a new LoginDto.
         * @memberof login
         * @classdesc Represents a LoginDto.
         * @implements ILoginDto
         * @constructor
         * @param {login.ILoginDto=} [properties] Properties to set
         */
        function LoginDto(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * LoginDto id.
         * @member {string} id
         * @memberof login.LoginDto
         * @instance
         */
        LoginDto.prototype.id = "";

        /**
         * LoginDto params.
         * @member {string} params
         * @memberof login.LoginDto
         * @instance
         */
        LoginDto.prototype.params = "";

        /**
         * Creates a new LoginDto instance using the specified properties.
         * @function create
         * @memberof login.LoginDto
         * @static
         * @param {login.ILoginDto=} [properties] Properties to set
         * @returns {login.LoginDto} LoginDto instance
         */
        LoginDto.create = function create(properties) {
            return new LoginDto(properties);
        };

        /**
         * Encodes the specified LoginDto message. Does not implicitly {@link login.LoginDto.verify|verify} messages.
         * @function encode
         * @memberof login.LoginDto
         * @static
         * @param {login.ILoginDto} message LoginDto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LoginDto.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.params);
            return writer;
        };

        /**
         * Encodes the specified LoginDto message, length delimited. Does not implicitly {@link login.LoginDto.verify|verify} messages.
         * @function encodeDelimited
         * @memberof login.LoginDto
         * @static
         * @param {login.ILoginDto} message LoginDto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LoginDto.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a LoginDto message from the specified reader or buffer.
         * @function decode
         * @memberof login.LoginDto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {login.LoginDto} LoginDto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LoginDto.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.login.LoginDto();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.params = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("id"))
                throw $util.ProtocolError("missing required 'id'", { instance: message });
            if (!message.hasOwnProperty("params"))
                throw $util.ProtocolError("missing required 'params'", { instance: message });
            return message;
        };

        /**
         * Decodes a LoginDto message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof login.LoginDto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {login.LoginDto} LoginDto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LoginDto.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a LoginDto message.
         * @function verify
         * @memberof login.LoginDto
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LoginDto.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isString(message.id))
                return "id: string expected";
            if (!$util.isString(message.params))
                return "params: string expected";
            return null;
        };

        return LoginDto;
    })();

    return login;
})();