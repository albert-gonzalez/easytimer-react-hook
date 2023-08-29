import terser from '@rollup/plugin-terser';
import license from 'rollup-plugin-license';
import typescript from 'rollup-plugin-typescript2';

// eslint-disable-next-line no-undef
const environment = process.env.environment || 'development';
const isProd = environment === 'production';

export default {
    input: 'src/index.ts',
    external: ['react', 'easytimer.js'],
    output: {
        format: 'umd',
        name: 'easytimer-react-hook',
        file: `dist/index${isProd ? '.min' : ''}.js`,
        exports: 'named',
        globals: {
            react: 'React',
            'easytimer.js': 'easytimer',
        },
    },
    plugins: [
        typescript(),
        isProd ? terser() : {},
        license({
            banner: `
        <%= pkg.name %>
        Generated: <%= moment().format('YYYY-MM-DD') %>
        Version: <%= pkg.version %>
        `,
        }),
    ],
};
