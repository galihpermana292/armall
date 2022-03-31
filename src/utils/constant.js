import akses from '../images/akses.png';
import people from '../images/people.png';
import wallet from '../images/wallet.png';
import interaksi from '../images/interaksi.png';
import testi from '../images/testi.png';
import quote from '../images/quote.png';
import Landing from '../pages/landing';
import CariDosen from '../pages/cariDosen';
import Bantuan from '../pages/bantuan';
export const WHY_US = [
	{
		image: akses,
		title: 'Kemudahan Akses',
		desc: 'Tentukan topik yang sesuai dengan judul skripsi atau tugas akhir kamu dan temukan dosen sesuai keinginanmu.',
	},
	{
		image: people,
		title: 'Dosen Berpengalaman',
		desc: 'Kamu tidak perlu ragu dengan dosen-dosen yang ada di website kami karena para dosen di sini merupakan dosen yang sudah ahli di bidangnya dan siap membimbing kamu.',
	},
	{
		image: interaksi,
		title: 'Interaksi Langsung',
		desc: 'Kamu dapat bertemu dengan dosen pembimbing secara langsung sesuai dengan tempat yang sudah disepakati. Kamu juga dapat mengatur pertemuan secara online melalui video conference ataupun chat.',
	},
	{
		image: wallet,
		title: 'Harga Terjangkau',
		desc: 'Tidak perlu khawatir soal harga karena di sini kamu dapat menemukan dosen terbaik dengan harga yang terjangkau.',
	},
];

export const TESTIMONI = [
	{
		image: testi,
		name: 'Ryo Shandy',
		univ: 'Sistem Informasi - Universitas Brawijaya',
		text: 'Dosennya asik dan seru, saya jadi bisa menemukan solusi untuk skripsinya',
	},
	{
		image: testi,
		name: 'Zidane Ali',
		univ: 'Teknik Komputer - Universitas Brawijaya',
		text: 'Dosennya asik dan seru, saya jadi bisa menemukan solusi untuk skripsinya',
	},
	{
		image: testi,
		name: 'Galih Permana',
		univ: 'Sistem Informasi - Universitas Brawijaya',
		text: 'Dosennya asik dan seru, saya jadi bisa menemukan solusi untuk skripsinya',
	},
	{
		image: testi,
		name: 'Delfi Olivia',
		univ: 'Sistem Informasi - Universitas Brawijaya',
		text: 'Dosennya asik dan seru, saya jadi bisa menemukan solusi untuk skripsinya',
	},
];

export const pages = [
	{
		name: 'Beranda',
		route: '/',
		Component: () => <Landing />,
	},
	{
		name: 'Cari Dosen',
		route: '/cari-dosen',
		Component: () => <CariDosen />,
	},
	{
		name: 'Bantuan',
		route: '/bantuan',
		Component: () => <Bantuan />,
	},
];

export const FAQ = [
	{
		q: 'Apakah saya perlu login terlebih dahulu untuk melakukan konsultasi?',
		a: 'Ya, Anda perlu login terlebih dahulu sebelum berkonsultasi dengan dosen Anda',
		id: 1,
	},

	{
		q: 'Apakah saya bisa membatalkan konsultasi?',
		a: 'Anda dapat membatalkan konsultasi melalui fitur riwayat di halaman profile',
		id: 2,
	},

	{
		q: 'Apakah jika saya membatalkan konsultasi, dana akan dikembalikan?',
		a: 'Ya, dana akan dikembalikan sepenuhnya melalui metode pembayaran yang Anda pilih',
		id: 3,
	},

	{
		q: 'Bagaimana saya bisa menambah atau mengubah jadwal konsultasi?',
		a: 'Dosen dapat menambah atau mengubah jadwal konsultasi melalui fitur edit profile di halaman profile',
		id: 4,
	},

	{
		q: 'Metode apa saja yang dapat saya pakai untuk berkonsultasi?',
		a: 'Anda dapat berkonsultasi secara tatap muka, atau via chat ',
		id: 5,
	},
];
