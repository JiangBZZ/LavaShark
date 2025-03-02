import { LavaShark } from './LavaShark';
import Node from './Node';
import { Queue } from './queue/Queue';
import Track from './queue/Track';
import Filters from './Filters';
import { PlayerOptions, PlayerState, PlayOptions, VoiceState } from '../@types';
export declare enum ConnectionState {
    CONNECTING = 0,
    CONNECTED = 1,
    DISCONNECTED = 2
}
export default class Player {
    private readonly lavashark;
    node: Node | null;
    readonly guildId: string;
    readonly filters: Filters;
    private connectTimeout?;
    voiceChannelId: string;
    textChannelId?: string | null;
    selfDeaf?: boolean;
    selfMute?: boolean;
    current: Track | null;
    queue: Queue;
    queueRepeat: boolean;
    trackRepeat: boolean;
    position: number;
    private positionTimestamp;
    playing: boolean;
    paused: boolean;
    state: ConnectionState;
    voiceState: VoiceState;
    moving: boolean;
    static checkOptions(options: PlayerOptions): void;
    /**
     * Create a new Player instance
     * @param {LavaShark} lavashark - The lavashark instance
     * @param {Object} options - The player options
     * @param {String} options.guildId - The guild id of this player
     * @param {String} options.voiceChannelId - The voice channel id of this player
     * @param {String} [options.textChannelId] - The text channel id of this player
     * @param {Boolean} [options.selfMute] - Whether or not this player is muted
     * @param {Boolean} [options.selfDeaf] - Whether or not this player is deafened
     * @param {Queue} [options.queue] - The queue for this player
     */
    constructor(lavashark: LavaShark, options: PlayerOptions);
    /**
     * Gets the exact track position based on the last playerUpdate packet
     */
    get exactPosition(): number;
    /**
     * Gets the queue duration in milliseconds
     * @deprecated - Use `queue.duration` instead
     */
    get queueDuration(): number;
    /**
     * Gets the volume of the player
     */
    get volume(): number;
    /**
     * Assigns a Node to this player
     * @private
     */
    private assignNode;
    /**
     * Connects to the voice channel
     */
    connect(): void;
    /**
     * Disconnects from the voice channel
     */
    disconnect(): void;
    /**
     * Destroys the player
     */
    destroy(): Promise<void>;
    /**
     * @param {Node} node - The target node to move the player
     */
    moveNode(node: Node): Promise<void>;
    /**
     * Gets the latency between lavalink client & node
     * @returns {Promise<Number>} - In milliseconds
     */
    ping(): Promise<Number>;
    /**
     * Plays a track
     * @param {Object} [options] - Play options
     * @param {Number} [options.startTime] - Start time in milliseconds
     * @param {Number} [options.endTime] - End time in milliseconds
     * @param {Boolean} [options.noReplace] - Whether to ignore operation if a track is already playing or paused
     */
    play(options?: PlayOptions): Promise<void>;
    /**
     * Sends a voice state update payload to the discord gateway
     * @private
     */
    private sendVoiceState;
    /**
     * Sets the bot's self deaf state
     * @param state - Whether to self deaf or not
     */
    setSelfDeaf(state: boolean): void;
    /**
     * Sets the bot's self mute state
     * @param {Boolean} state - Whether to self mute or not
     */
    setSelfMute(state: boolean): void;
    /**
     * Sets the track looping
     * @param {Boolean} state - Whether to enable track looping or not
     */
    setTrackLoop(state: boolean): void;
    /**
     * Sets the queue looping
     * @param {Boolean} state - Whether to enable queue looping or not
     */
    setQueueLoop(state: boolean): void;
    /**
     * Sets the player voice channel
     * @param {String} channelId - The voice channel id
     */
    setVoiceChannel(channelId: string): void;
    /**
     * Shuffles the queue
     * @deprecated Use `queue.shuffle()` instead
     */
    /**
     * Skips the current playing track
     * @param {Number} [amount=1] - The amount of tracks to skip
     */
    skip(amount?: number): Promise<boolean>;
    /**
     * Pause or unpause the player
     * @param {Boolean} [state=true] - Whether to pause or unpause the player
     */
    pause(state?: boolean): Promise<boolean>;
    /**
     * Resume the player
     */
    resume(): Promise<boolean>;
    /**
     * Seek to a specific position in the track
     * @param {Number} position - The position to seek, in milliseconds
     */
    seek(position: number): Promise<void>;
    sendVoiceUpdate(): Promise<void>;
    update(state: PlayerState): void;
}
