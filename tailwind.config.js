module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			backgroundImage: {
				'section2-pattern': "url('/src/images/section2.svg')",
			},
			colors: {
				orange: {
					primary: '#FF9F1C',
					secondary: '#FFF3E3',
				},
				white: '#fff',
				netral: {
					primary: '#000',
					secondary: '#808080',
				},
				tosca: {
					primary: '#2EC4B6',
					secondary: '#92E6DE',
				},
			},
		},
	},
	plugins: [],
};
