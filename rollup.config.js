import terser from 'rollup-plugin-terser';
import license from 'rollup-plugin-license';
import typescript from 'rollup-plugin-typescript2';

// eslint-disable-next-line no-undef
let optimize = process.env.optimize || false;

export default {
    input: 'src/index.ts',
    external: ['react', 'easytimer.js'],
    output: {
        format: 'umd',
        name: 'easytimer-react-hook',
        file: `dist/index${optimize ? '.min' : ''}.js`,
        exports: 'named',
        globals: {
            react: 'React',
            'easytimer.js': 'easytimer',
        },
    },
    plugins: [
        typescript(),
        optimize ? terser() : {},
        license({
            banner: `
        <%= pkg.name %>
        Generated: <%= moment().format('YYYY-MM-DD') %>
        Version: <%= pkg.version %>
        `,
        }),
    ],
};
