import Mux from "@mux/mux-node";

const token = process.env.MUX_ACCESS_TOKEN_ID as string;
const secret = process.env.MUX_SECRET_KEY as string;

/**
 * Used for programmatic access of Video assets
 */
const mux = new Mux(token, secret, {});
