module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			backgroundImage: {
				'section2-pattern': "url('/src/images/section2.svg')",
				'cari-dosen-pattern': "url('/src/images/herocari.png')",
			},
			minHeight: {
				'sm-screen': '70vh',
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
					secondary: '#E4F9F7',
				},
			},
			width: {
				search: '500px',
			},
		},
	},
	plugins: [],
};
