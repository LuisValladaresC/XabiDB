module.exports = {
	plugins: [
		require('postcss-import'),
		require('postcss-preset-env')({
			// autoprefixer: { grid: true }
		}),
		require('cssnano')({
            preset: 'default',
        }),
	]
}