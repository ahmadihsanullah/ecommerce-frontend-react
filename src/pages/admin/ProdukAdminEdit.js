import React, { useEffect, useState } from "react";
import Mainpage from "../../components/Mainpage";
import { useNavigate, useParams } from "react-router-dom";
import { findAllKategori } from "../../service/KategoriService";
import { findProdukById, updateProduk } from "../../service/ProdukService";
import { ProgressBar } from "primereact/progressbar";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

const ProdukAdminEdit = () => {

    const [produk, setProduk] = useState();
    const [kategoris, setKategoris] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submited, setSubmited] = useState(false);

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        const loadKategori = async () => {
            try {
                const response = await findAllKategori();
                setKategoris(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        loadKategori();

        const loadProduk = async () => {
            try {
                const response = await findProdukById(id);
                const _produk = response.data;
                setProduk(_produk);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }

        loadProduk();
    }, [id]);

    const saveProduk = async () => {
        setSubmited(true);

        const isProdukValid = () => {
            if (!produk?.id) return false;
            if (!produk.nama || produk.nama.length < 3) return false;
            if (!produk.kategori?.id) return false;
            if (produk.harga == null || isNaN(produk.harga)) return false;
            if (produk.stok == null || isNaN(produk.stok)) return false;
            return true;
        };

        if (!isProdukValid()) {
            console.warn("Data tidak valid");
            return;
        }

        try {
            const payload = {
                ...produk,
                harga: parseFloat(produk.harga),
                stok: parseFloat(produk.stok),
                kategori: { id: produk.kategori.id }
            };

            console.log("Payload yang dikirim:", payload);
            await updateProduk(payload);
            navigate(`/admin/produk/detail/${produk.id}`, { replace: true });
        } catch (error) {
            console.error("Gagal update:", error);
        }
    };


    return (
        <Mainpage>
            {loading ?
                <ProgressBar mode="indeterminate"
                    className="my-progress-bar" /> :
                <div className="main-content">
                    <div className="content">
                        <div className="content-inner">
                            <div className="content-header">
                                <h2>Edit Produk</h2>
                            </div>
                            <div className="content-body">
                                <div className="content-form shadow-1">
                                    <div className="p-fluid mb-4">
                                        <InputText type="hidden" value={produk?.id || ''} />
                                        <div className="p-filed mb-3">
                                            <label htmlFor="nama" className="form-label">Nama</label>
                                            <InputText value={produk.nama}
                                                placeholder="Ketik nama produk"
                                                id="nama"
                                                onChange={(e) => {
                                                    const val = (e.target && e.target.value) || '';
                                                    const _produk = { ...produk };
                                                    _produk.nama = val;
                                                    setProduk(_produk);
                                                }}
                                            />
                                            {submited && !produk.nama && <span className="p-error">Nama produk tidak boleh kosong</span>}
                                        </div>

                                        <div className="p-field mb-3">
                                            <label htmlFor="kategori" className="form-label">Kategori</label>
                                            <Dropdown optionLabel="nama"
                                                optionValue="id"
                                                id="kategori"
                                                value={produk.kategori.id}
                                                options={kategoris}
                                                placeholder="Pilih kategori"
                                                onChange={(e) => {
                                                    const val = (e.target && e.target.value) || null;
                                                    const _produk = { ...produk };
                                                    _produk.kategori.id = val;
                                                    setProduk(_produk);
                                                }}
                                            />
                                            {submited && !produk.kategori.id && <span className="p-error">Kategori produk harus dipilih</span>}
                                        </div>

                                        <div className="p-filed mb-3">
                                            <label htmlFor="deskripsi" className="form-label">Deskripsi</label>
                                            <InputText value={produk.deskripsi}
                                                placeholder="Ketik deskripsi produk"
                                                id="deskripsi"
                                                onChange={(e) => {
                                                    const val = (e.target && e.target.value) || '';
                                                    const _produk = { ...produk };
                                                    _produk.deskripsi = val;
                                                    setProduk(_produk);
                                                }}
                                            />
                                        </div>

                                        <div className="p-filed mb-3">
                                            <label htmlFor="harga" className="form-label">Harga</label>
                                            <InputText value={produk.harga}
                                                placeholder="Ketik harga produk"
                                                id="harga"
                                                onChange={(e) => {
                                                    const val = (e.target && e.target.value) || '';
                                                    const _produk = { ...produk };
                                                    _produk.harga = val;
                                                    setProduk(_produk);
                                                }}
                                            />
                                            {submited && (produk.harga === null || produk.harga === '' || isNaN(produk.harga)) && (
                                                <span className="p-error">Harga produk tidak boleh kosong</span>
                                            )}

                                        </div>

                                        <div className="p-filed mb-3">
                                            <label htmlFor="stok" className="form-label">Stok</label>
                                            <InputText value={produk.stok}
                                                placeholder="Ketik stok produk"
                                                id="stok"
                                                onChange={(e) => {
                                                    const val = (e.target && e.target.value) || '';
                                                    const _produk = { ...produk };
                                                    _produk.stok = val;
                                                    setProduk(_produk);
                                                }}
                                            />
                                            {submited && (produk.stok === null || produk.stok === '' || isNaN(produk.stok)) && (
                                                <span className="p-error">Stok produk tidak boleh kosong</span>
                                            )}
                                        </div>

                                    </div>

                                    <div>
                                        <Button label="Simpan"
                                            icon="pi pi-check"
                                            onClick={saveProduk}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </Mainpage>
    )
}

export default ProdukAdminEdit;