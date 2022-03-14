declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    NEXT_PUBLIC_HOSTNAME?: string;
  }
}
