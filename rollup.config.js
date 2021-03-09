import { uglify } from 'rollup-plugin-uglify';
import license from 'rollup-plugin-license';
import typescript from 'rollup-plugin-typescript2';

let optimize = process.env.optimize || false;

export default {
    input: 'src/index.ts',
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
        optimize ? uglify() : {},
        license({
            banner: `
        <%= pkg.name %>
        Generated: <%= moment().format('YYYY-MM-DD') %>
        Version: <%= pkg.version %>
        `,
        }),
    ],
};
