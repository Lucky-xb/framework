declare class Base64 {
    /**
     * encode
     * @param input 
     */
    static encode(input: string): string;

    /**
     * decode
     * @param input 
     */
    static decode(input: string): string;

    static utf8_encode(input: string): string;
    static utf8_decode(input: string): string;
}
