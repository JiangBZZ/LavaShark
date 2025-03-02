import { LavaShark } from './LavaShark';
import { RESTManager } from './rest/RESTManager';
import type { Info, NodeOptions, NodeStats, RoutePlannerStatus, version } from '../@types';
export declare enum NodeState {
    CONNECTING = 0,
    CONNECTED = 1,
    DISCONNECTED = 2
}
export default class Node {
    private readonly lavashark;
    readonly options: NodeOptions;
    private penalties?;
    private ws;
    private packetQueue;
    readonly rest: RESTManager;
    retryAttempts: number;
    state: NodeState;
    stats: NodeStats;
    version?: version;
    static checkOptions(options: NodeOptions): void;
    /**
     * Create a new LavaShark instance
     * @param {LavaShark} lavashark - The LavaShark instance
     * @param {Object} options - The node options
     * @param {String} [options.id] - The lavalink node identifier
     * @param {String} options.hostname - The lavalink node hostname
     * @param {Number} options.port - The lavalink node port
     * @param {String} [options.password] - The lavalink node password
     * @param {Boolean} [options.secure] - Whether the lavalink node uses TLS/SSL or not
     * @param {String} [options.region] - The lavalink node region
     * @param {String} [options.resumeKey] - The resume key
     * @param {Number} [options.resumeTimeout] - The resume timeout, in seconds
     * @param {Number} [options.maxRetryAttempts] - The max number of reconnect attempts
     * @param {Number} [options.retryAttemptsInterval] - The interval between reconnect attempts, in milliseconds
     * @param {Boolean} [options.followRedirects] - Whether to follow redirects (3xx status codes)
     * @param {Boolean} [options.sendSpeakingEvents=false] - Tells the lavalink node to send speaking events (Supported in my custom lavalink fork)
     */
    constructor(lavashark: LavaShark, options: NodeOptions);
    get totalPenalties(): number;
    get identifier(): string;
    private calcPenalties;
    connect(): void;
    disconnect(): void;
    /**
     * Get the Lavalink Node version
     * @returns {Promise<version>}
     */
    getVersion(): Promise<version>;
    /**
     * Get the Lavalink Node information
     * @returns {Promise<Info>}
     */
    getInfo(): Promise<Info>;
    /**
     * Gets the route planner status
     * @returns {Promise<Object>}
     */
    getRoutePlannerStatus(): Promise<RoutePlannerStatus>;
    /**
     * Unmarks a failed address
     * @param {String} address - The address to unmark
     */
    unmarkFailedAddress(address: string): Promise<void>;
    /**
     * Unmarks all failed address
     */
    unmarkAllFailedAddress(): Promise<void>;
    private pollTrack;
    private handleSpeakingEvent;
    private handlePlayerEvent;
    private handleTrackStart;
    private handleTrackEnd;
    private handleTrackStuck;
    private handleTrackException;
    private handleWSClose;
    private open;
    private message;
    private error;
    private close;
    private upgrade;
}
