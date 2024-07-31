import Navbar from "@/components/common/navbar"
import SectionWrapper from "@/components/common/section-wrapper"
import { Separator } from "@/components/ui/separator"
import { HOME_DESC } from "@/constants/home-desc"
import { Link } from "react-router-dom"

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <SectionWrapper className="pt-32 max-h-screen font-poppins px-12">
        <div className="flex flex-row w-full rounded-[50px] h-96 py-8 px-16 drop-shadow-2xl bg-color-1">
          <div className=" w-[50%]">
            <h1 className="text-[#FBFBFB] font-bold text-5xl tracking-normal pt-5 ">
              Program Mobile
            </h1>
            <h1 className="text-[#FBFBFB] font-bold text-5xl tracking-normal mt-5">
              Development
            </h1>
            <p className="text-[#FBFBFB] text-xl w-96 mt-5 leading-8 ">
              Membuat sebuah aplikasi mobile di platform android selama
              <br />
              (satu) semester.
            </p>
            <button className="bg-white px-7 py-2 rounded-3xl mt-5 flex items-center gap-2 text-[#334C8A] hover:bg-[#334C8A] hover:text-white font-medium">
              Baca Selengkapnya
            </button>
          </div>
          <div className="w-1/2 hidden  md:flex justify-center items-center pt-15">
            <img
              src="./images/person-hero.png"
              className="w-[800px] pt-5"
              alt=""
            />
          </div>
        </div>
      </SectionWrapper>
      <SectionWrapper>
        <div className="font-poppins">
          <h1 className="px-12 pt-10 font-bold text-3xl text-gradient">
            Android Mobile Development
          </h1>
          <div className="flex flex-row  rounded-[50px] bg-white px-16 mt-8 drop-shadow-2xl py-10">
            <div className="px-12 pt-36">
              <img src="/images/person-desc.png" alt="" className="w-full" />
            </div>
            <div className="pt-0 w-[1000px] px-12">
              <h1 className="text-[#030303] text-2xl font-bold">
                Apa itu Mobile Development?
              </h1>
              <p className="text-[#6D737A] pt-2 text-lg">
                Infinite Learning | di Kota Batam
              </p>
              <p className="text-[#6D737A] pt-4 text-balance text-justify text-lg">
                Infinite Learning - Android Mobile Application and Cloud
                Development memberikan satu pengalaman bekerjasama membuat
                sebuah aplikasi mobile di platform android selama 1 (satu)
                semester. Program ini dibagi menjadi beberapa fase yang
                mengikuti pola project management menggunakan SCRUM. Setiap
                individu membentuk sebuah group kecil yang terdiri dari seorang
                Coder, Designer dan Product Manager/SCRUM Master. Peserta akan
                diberikan sebuah pengalaman belajar dengan kondisi sesungguhnya
                di dalam industri. Hal ini akan mempermudah para peserta pada
                saat menyelesaikan program ini diserap dan diterima bekerja di
                berbagai industri. <br />
                Mekanisme sukses dari program ini akan membuat para peserta
                membentuk group challenge yang terdiri dari maksimal 5 orang.
                Masing-masing anggota group akan mempunyai role masing-masing
                sesuai dengan 3 role utama dalam pembuatan sebuah mobile
                application yaitu seorang hacker atau coder atau programmer,
                berikutnya adalah seorang hipster atau seorang user interface
                dan user experience designer dan role terakhir adalah seorang
                hustler atau product manager.
              </p>
              <div className="w-full flex justify-center flex-col items-center mt-5 gap-4 pt-8 ">
                {HOME_DESC.map((data, index) => {
                  const Icon = data.icon
                  return (
                    <div
                      key={index + 1}
                      className="flex items-start rounded-[14px] py-[14px] px-[27px] gap-x-[30px] shadow-custom-drop w-[524px] group hover:bg-color-1 cursor-pointer">
                      <Icon className="w-[60px] h-[60px] group-hover:text-white text-color-5 flex-shrink-0  " />
                      <div>
                        <h1 className="text-txt20_30 group-hover:text-white">
                          {data.desc.title}
                        </h1>
                        <p className="text-txt16_24 text-color-4 group-hover:text-white">
                          {data.desc.subTitle}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
      <SectionWrapper>
        <div
          id="tentang-kami"
          className="flex max-h-max font-poppins  mt-10 gap-10">
          <div className="flex flex-col gap-3 max-w-4xl mt-10">
            <h1 className="font-bold text-gradient text-3xl">Tentang Kami</h1>
            <p className="text-md text-justify mt-5">
              Infinite Learning adalah sebuah divisi dair PT Kinema Systrans
              Multimedia (anak perusahaan Infinite Studios, Singapore), berpusat
              pada pengembangan kursus pelatihan kejuruan yang relevan dengan
              aktivitas Infinite Studios dan meningkatnyapermintaan bakat
              terampil dalam ekosistem Nongsa Digital Park. Memperluas operasi
              pelatihan internalnya saat ini, Infinite Learning pada tahun 2018
              telah memperoleh lisensi LPK dari Kementerian Tenaga Kerja
              Indonesia. Hal ini memungkinkan mereka untuk melaksanakan kursus
              pelatihan kejuruan yang terbuka untuk umum, yang dapat digunakan
              bekerja sama dengan lembaga pendidikan lokal dan internasional.
              Saat ini, kegiatan Pendidikan Vokasi dilakukan di bawah lisensi
              LPK untuk pelatihan di Nongsa Digital Park (NDP), bekerja sama
              dengan Apple Developer Academy, Royal Melbourne Institute of
              Technology Cyber Security Course, Program Studi Mandiri
              Kementerian Pendidikan.
            </p>
          </div>
          <img src="/images/person-aboutus.png" alt="" className="max-w-sm" />
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div id="contact" className="h-[600px] flex flex-row font-poppins">
          <div>
            <img
              src="/images/person-visimisi.png"
              alt=""
              className="max-w-sm mt-10"
            />
          </div>
          <div className="px-[60px] pt-[50px]">
            <h1 className="font-bold text-gradient text-[35px]">
              Visi dan Misi
            </h1>
            <p className="font-bold text-[#6D737A] mt-5">
              Visi Infinite Learning
            </p>
            <p className="text-justify mt-2">
              “Menjadi penyedia solusi terdepan di sektor teknologi, riset dan
              pengembangan, serta inovasi melalui pelatihan dan pendidikan untuk
              meningkatkan jumlah talenta digital yang kreatif dan inovatif yang
              bisa mandiri dan sekaligus bisa diterima oleh industri di
              Indonesia dan Dunia”
            </p>
            <p className="font-bold text-[#6D737A] mt-5">
              Misi Infinite Learning
            </p>
            <p className="font-justify mt-2">
              1. Bekerja sama dengan seluruh instansi pemerintah, badan riset
              nasional, lembaga Pendidikan/pelatihan baik dalam dan luar negeri
              untuk membuat standar kurikulum, kerjasama riset dan pengembangan,
              serta inovasi dan pendanaan.
            </p>
            <p>
              2. Merekrut guru, mentor, pelatih dan peneliti yang memenuhi
              standar kriteria industri.{" "}
            </p>
            <p>
              3. Melatih secara berkala guru, mentor, pelatih dan peneliti untuk
              terus memenuhi kebutuhan perkembangan teknologi di masa yang akan
              datang.
            </p>
            <p>
              4. Merekrut calon-calon peserta pelatihan dan pendidikan dari
              seluruh Indonesia.
            </p>
            <p>
              5. Bekerja sama dengan semua industri berbasis digital baik di
              Indonesia dan di luar negeri untuk penyerapan talenta digital
              Indonesia.
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* FOOTER */}
      <footer className=" flex flex-col p-10 bg-color-1 text-white text-xl font-poppins">
        <SectionWrapper>
          <div className="flex justify-between items-center gap-x-[80px]">
            <img
              src="/images/logo-white.png"
              alt=""
              className="h-[160px] w-[240px]"
            />
            <div className="flex items-start w-full justify-between  ">
              <div className="flex flex-col gap-y-5 ">
                <p className=" text-txt16_24 font-medium">Navigasi</p>
                <div className="flex flex-col gap-y-1 text-txt16_24">
                  <Link
                    to="/"
                    className="hover:underline hover:underline-offset-4">
                    Beranda
                  </Link>
                  <Link
                    to="#tentang-kami"
                    className="hover:underline hover:underline-offset-4">
                    Tentang Kami
                  </Link>
                  <Link
                    to="#kontak"
                    className="hover:underline hover:underline-offset-4">
                    Kontak
                  </Link>
                </div>
              </div>
              <div className="flex flex-col gap-y-5">
                <p className="text-txt16_24 font-medium">Ikuti Kami</p>
                <div className="flex flex-col gap-y-1 text-txt16_24">
                  <Link
                    to="/"
                    className="hover:underline hover:underline-offset-4">
                    Instagram
                  </Link>
                  <Link
                    to="#tentang-kami"
                    className="hover:underline hover:underline-offset-4">
                    Tiktok
                  </Link>
                  <Link
                    to="#kontak"
                    className="hover:underline hover:underline-offset-4">
                    Linkedin
                  </Link>
                </div>
              </div>
              <div className="flex flex-col gap-y-5">
                <p className="text-txt16_24 font-medium">Hubungi Kami</p>
                <div className="text-txt16_24">
                  <h1>
                    Digital Park, Sambau, Kecamatan <br /> Nongsa, Kota Batam,
                    Kepulauan <br /> Riau 29466
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <Separator />
          <div className="flex flex-row pt-3 justify-between w-full">
            <p className="invisible"> (0778) 7100673</p>
            <h2 className="text-center text-txt16_24">
              © 2024 PT KINEMA SYSTRANS MULTIMEDIA{" "}
            </h2>
            <div className="flex flex-row items-center gap-2">
              <p className=" pb-1 text-txt16_24">(0778) 7100673</p>
            </div>
          </div>
        </SectionWrapper>
      </footer>
    </div>
  )
}
