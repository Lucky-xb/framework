type Long = protobuf.Long;

/** Namespace activity. */
declare namespace activity {

    /** Properties of an ActivityDto. */
    interface IActivityDto {

        /** ActivityDto id */
        id: string;

        /** ActivityDto params */
        params: string;
    }

    /** Represents an ActivityDto. */
    class ActivityDto implements IActivityDto {

        /**
         * Constructs a new ActivityDto.
         * @param [properties] Properties to set
         */
        constructor(properties?: activity.IActivityDto);

        /** ActivityDto id. */
        public id: string;

        /** ActivityDto params. */
        public params: string;

        /**
         * Creates a new ActivityDto instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ActivityDto instance
         */
        public static create(properties?: activity.IActivityDto): activity.ActivityDto;

        /**
         * Encodes the specified ActivityDto message. Does not implicitly {@link activity.ActivityDto.verify|verify} messages.
         * @param message ActivityDto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: activity.IActivityDto, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified ActivityDto message, length delimited. Does not implicitly {@link activity.ActivityDto.verify|verify} messages.
         * @param message ActivityDto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: activity.IActivityDto, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes an ActivityDto message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ActivityDto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): activity.ActivityDto;

        /**
         * Decodes an ActivityDto message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ActivityDto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): activity.ActivityDto;

        /**
         * Verifies an ActivityDto message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: [ 'object' ].<string, any>): (string|null);
    }
}

/** Namespace bag. */
declare namespace bag {

    /** Properties of a BagDto. */
    interface IBagDto {

        /** BagDto id */
        id: string;

        /** BagDto params */
        params: string;
    }

    /** Represents a BagDto. */
    class BagDto implements IBagDto {

        /**
         * Constructs a new BagDto.
         * @param [properties] Properties to set
         */
        constructor(properties?: bag.IBagDto);

        /** BagDto id. */
        public id: string;

        /** BagDto params. */
        public params: string;

        /**
         * Creates a new BagDto instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BagDto instance
         */
        public static create(properties?: bag.IBagDto): bag.BagDto;

        /**
         * Encodes the specified BagDto message. Does not implicitly {@link bag.BagDto.verify|verify} messages.
         * @param message BagDto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: bag.IBagDto, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified BagDto message, length delimited. Does not implicitly {@link bag.BagDto.verify|verify} messages.
         * @param message BagDto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: bag.IBagDto, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a BagDto message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BagDto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): bag.BagDto;

        /**
         * Decodes a BagDto message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BagDto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): bag.BagDto;

        /**
         * Verifies a BagDto message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: [ 'object' ].<string, any>): (string|null);
    }
}

/** Namespace login. */
declare namespace login {

    /** Properties of a LoginDto. */
    interface ILoginDto {

        /** LoginDto id */
        id: string;

        /** LoginDto params */
        params: string;
    }

    /** Represents a LoginDto. */
    class LoginDto implements ILoginDto {

        /**
         * Constructs a new LoginDto.
         * @param [properties] Properties to set
         */
        constructor(properties?: login.ILoginDto);

        /** LoginDto id. */
        public id: string;

        /** LoginDto params. */
        public params: string;

        /**
         * Creates a new LoginDto instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LoginDto instance
         */
        public static create(properties?: login.ILoginDto): login.LoginDto;

        /**
         * Encodes the specified LoginDto message. Does not implicitly {@link login.LoginDto.verify|verify} messages.
         * @param message LoginDto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: login.ILoginDto, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified LoginDto message, length delimited. Does not implicitly {@link login.LoginDto.verify|verify} messages.
         * @param message LoginDto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: login.ILoginDto, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a LoginDto message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LoginDto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): login.LoginDto;

        /**
         * Decodes a LoginDto message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LoginDto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): login.LoginDto;

        /**
         * Verifies a LoginDto message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: [ 'object' ].<string, any>): (string|null);
    }
}
