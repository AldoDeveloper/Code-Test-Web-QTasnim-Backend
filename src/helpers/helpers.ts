
export function createSlug(str: string) {
    return str
      .toLowerCase() // Ubah semua huruf menjadi huruf kecil
      .replace(/[^\w\s-]/g, '') // Hapus karakter khusus
      .trim() // Hapus spasi di awal dan akhir string
      .replace(/\s+/g, '-') // Ganti spasi dengan tanda hubung
      .replace(/-+/g, '-'); // Hapus beberapa tanda hubung berurutan
  }