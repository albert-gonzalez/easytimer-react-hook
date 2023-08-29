import terser from '@rollup/plugin-terser';
import license from 'rollup-plugin-license';
import typescript from 'rollup-plugin-typescript2';
import serve from 'rollup-plugin-serve';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import scss from 'rollup-plugin-scss';
import copy from 'rollup-plugin-copy';

// eslint-disable-next-line no-undef
const environment = process.env.environment || 'development';
const isProd = environment === 'production';

export default {
    input: 'example/src/index.tsx',
    output: {
        format: 'iife',
        file: `example/dist/index.js`,
    },
    external: [],
    plugins: [
        resolve(),
        commonjs(),
        scss({ outputStyle: isProd ? 'compressed' : 'expanded', fileName: 'index.css' }),
        typescript({ tsconfigOverride: { compilerOptions: { declaration: false } } }),
        isProd && terser(),
        license({
            banner: `
        <%= pkg.name %>
        Generated: <%= moment().format('YYYY-MM-DD') %>
        Version: <%= pkg.version %>
        `,
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify(environment),
            preventAssignment: true,
        }),
        copy({
            targets: [
                { src: 'example/fonts/**/*.ttf', dest: 'example/dist/fonts' },
                { src: 'example/images/**/*.png', dest: 'example/dist/images' },
            ],
        }),
        !isProd && serve('.'),
    ],
};
