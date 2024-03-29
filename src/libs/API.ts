import {CustomerDTO} from '../entities/customers/types';
import {TaskDTO} from '../entities/tasks/types';
import {UserDTO} from '../store/account/types';

type chunks = Array<unknown>;

export default class API {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() {}

    static get base(): string {
        // eslint-disable-next-line no-console
        return import.meta.env.VITE_API;
    }

    static get prefix(): string {
        return '/api/v1/';
    }

    static get app(): string {
        return `${this.base}${this.prefix}`;
    }

    protected static joinChunks(...chunks: chunks): string {
        const suffix = chunks.join('/');
        return suffix.length > 0 ? `/${suffix}` : '';
    }

    static reset(url: 'reset-password' | 'new-password'): string;
    static reset(...chunks: chunks) {
        return `${this.app}reset${this.joinChunks(...chunks)}`;
    }

    static dashboard(url: 'tasks'): string;
    static dashboard(...chunks: chunks) {
        return `${this.app}dashboard${this.joinChunks(...chunks)}`;
    }

    static auth(url: 'login' | 'logout' | 'registration' | 'refresh'): string;
    static auth(...chunks: chunks) {
        return `${this.app}auth${this.joinChunks(...chunks)}`;
    }

    static users(): string;
    static users(id: UserDTO['_id'], command?: 'change-password'): string;
    static users(url: 'roles'): string;
    static users(...chunks: chunks) {
        return `${this.app}users${this.joinChunks(...chunks)}`;
    }

    static tasks(): string;
    static tasks(id: TaskDTO['_id']): string;
    static tasks(...chunks: chunks) {
        return `${this.app}tasks${this.joinChunks(...chunks)}`;
    }

    static directory(): string;
    static directory(chunk: 'status'): string;
    static directory(command: string, command2?: string): string;
    static directory(...chunks: chunks) {
        return `${this.app}directory${this.joinChunks(...chunks)}`;
    }

    static customers(): string;
    static customers(id: CustomerDTO['_id']): string;
    static customers(...chunks: chunks) {
        return `${this.app}customers${this.joinChunks(...chunks)}`;
    }

    static profile(): string;
    static profile(...chunks: chunks) {
        return `${this.app}profile${this.joinChunks(...chunks)}`;
    }
}
