--
-- PostgreSQL database dump
--

-- Dumped from database version 14.6
-- Dumped by pg_dump version 14.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: ref; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA ref;


ALTER SCHEMA ref OWNER TO postgres;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: jobdesk; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.jobdesk (
    id_jobdesk uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    nama_jobdesk character varying(255) NOT NULL,
    kuota integer NOT NULL,
    created_date timestamp without time zone DEFAULT now() NOT NULL,
    last_update timestamp without time zone DEFAULT now() NOT NULL,
    soft_delete integer DEFAULT 0 NOT NULL,
    penanggung_jawab character varying(100) NOT NULL
);


ALTER TABLE public.jobdesk OWNER TO postgres;

--
-- Name: pengajuan; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pengajuan (
    id_pengajuan uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    nama character varying(255) NOT NULL,
    tgl_lahir date NOT NULL,
    jenis_kelamin character(1) NOT NULL,
    email character varying(150) NOT NULL,
    no_telp character varying(15) NOT NULL,
    created_date time without time zone DEFAULT now() NOT NULL,
    last_update timestamp without time zone DEFAULT now() NOT NULL,
    soft_delete integer DEFAULT 0 NOT NULL,
    referral_id uuid DEFAULT public.uuid_generate_v4(),
    status_approval integer DEFAULT 0 NOT NULL,
    approved_by uuid,
    target_jobdesk uuid NOT NULL,
    nomor_induk_instansi character varying(15) NOT NULL,
    dokumen_validasi text,
    nama_pembimbing character varying(100) NOT NULL,
    nip_pembimbing character(36) NOT NULL,
    kontak_pembimbing character(16) NOT NULL,
    nama_instansi character varying(25) NOT NULL,
    curriculum_vitae text,
    jenis_tingkat_pendidikan character varying(25),
    tingkat_pendidikan integer
);


ALTER TABLE public.pengajuan OWNER TO postgres;

--
-- Name: instansi; Type: TABLE; Schema: ref; Owner: postgres
--

CREATE TABLE ref.instansi (
    id_instansi uuid NOT NULL,
    nama character varying(150) NOT NULL,
    kode_instansi character varying(12) NOT NULL,
    alamat text,
    kode_pos character(7),
    website text
);


ALTER TABLE ref.instansi OWNER TO postgres;

--
-- Data for Name: jobdesk; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.jobdesk (id_jobdesk, nama_jobdesk, kuota, created_date, last_update, soft_delete, penanggung_jawab) FROM stdin;
668dcd7b-5928-4438-a83d-d13c167bc7fe	Programmer	2	2022-04-06 04:43:12.788283	2022-04-06 04:43:12.788283	0	luthfimnabil17@gmail.com
8d71c578-15ea-4f98-bac7-575ce0307ea1	Front-End	10	2022-12-21 04:11:55.249984	2022-12-21 04:11:55.249984	0	admin@example.com
70066149-c531-47a8-b99e-7cad054290b3	Back-End	2	2022-12-22 07:52:05.944768	2022-12-22 07:52:05.944768	0	nama
953202e3-6740-49bc-851e-8116d9c26641	Programmer	2	2022-12-26 01:51:56.224986	2022-12-26 01:51:56.224986	0	luthfimnabil17@gmail.com
4d687869-60e2-4672-9cb1-db7c7f31dbcc	Analyst	2	2022-12-26 01:53:09.672712	2022-12-26 01:53:09.672712	0	admin@example.com
c82c770c-8b7e-4479-beb8-420af1de6588	Tester	2	2022-12-26 01:54:37.318506	2022-12-26 01:54:37.318506	0	admin@example.com
\.


--
-- Data for Name: pengajuan; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pengajuan (id_pengajuan, nama, tgl_lahir, jenis_kelamin, email, no_telp, created_date, last_update, soft_delete, referral_id, status_approval, approved_by, target_jobdesk, nomor_induk_instansi, dokumen_validasi, nama_pembimbing, nip_pembimbing, kontak_pembimbing, nama_instansi, curriculum_vitae, jenis_tingkat_pendidikan, tingkat_pendidikan) FROM stdin;
08784103-46e6-4f28-88d3-50ea7b03cd50	kiki	2007-12-23	p	kiki@example.com	08123456	03:00:31.632236	2023-01-20 03:00:31.632236	0	9d310e4c-4927-4736-beb5-6620b80d7250	0	28599e36-ce7b-4da3-89b2-fe09551a27fb	70066149-c531-47a8-b99e-7cad054290b3	12345	dokumen_validasi167418362473420789-24819-1-PB.pdf	nama	12345                               	0812536         	SMP 1 Karawang	curriculum_vitae16741836233312870-6519-1-PB.pdf	SMP	3
0cbd4ab5-7b1d-447e-9199-a462d3091c46	Rizki Amelia	2001-09-23	p	rizkiamelia843@gmail.com	08123456	03:37:52.328046	2023-01-20 03:37:52.328046	0	1088074d-feff-471b-87c8-87a5cacb3161	0	28599e36-ce7b-4da3-89b2-fe09551a27fb	4d687869-60e2-4672-9cb1-db7c7f31dbcc	12345	dokumen_validasi167418587031420789-24819-1-PB-1.pdf	pembimbing	666123                              	0812345         	instansi	curriculum_vitae16741858698603383-7702-2-PB.pdf	Kuliah	7
c4b85c42-efb4-4ece-ab45-31cd6cfdd9fe	nurul update 	2001-06-06	p	nurul@example.com	0812341521	03:06:00.456524	2023-01-20 03:06:00.456524	0	fd291139-fc57-4769-9443-05a1cac2a4e8	0	c4b85c42-efb4-4ece-ab45-31cd6cfdd9fe	8d71c578-15ea-4f98-bac7-575ce0307ea1	12345		nama	12345                               	08123456        	instansi			7
add3fc12-ba03-4ae3-ae11-f4d0708d60dd	Muhammad Thorik Fauzian	1999-10-01	p	muhammad.thoriqfauzian@gmail.com	12345	04:21:19.014838	2023-01-17 04:21:19.014838	0	714f07d1-7c0a-4ee4-b1aa-40ac78274b10	0	4278cde4-999a-46e1-bb06-1807a88028f3	8d71c578-15ea-4f98-bac7-575ce0307ea1	123445	dokumen_validasi16739292789022155-4233-1-PB.pdf	Wildan	123456                              	08243561        	stmik amik bandung	curriculum_vitae167392927895149-IJCSE-02625.pdf	SMK	5
10acd7df-28c2-4757-87b2-93b0d03060c8	muhamad rizki rifaldi	2023-01-17	1	brotherstudio88@gmail.com	0812312311232	03:24:11.930892	2023-01-18 03:24:11.930892	0	57cfb4ca-8566-4c3e-9382-d676d8d7e48f	0	\N	8d71c578-15ea-4f98-bac7-575ce0307ea1	1231231312	dokumen_validasi1674012249595LogBook_MRizkiRifaldi_Juli_1942438.pdf	Teddy Hidayat	1231413423423                       	08234124139123  	stmik amik bandung	curriculum_vitae1674012250355LogBook_MRizkiRifaldi_Juli_1942438.pdf	\N	12
aad948f8-cde0-4d3c-b030-9a7ef2775b0c	Ahmad Rivaiy	2023-01-18	1	ahmad.rivaiy27@gmail.com	081000000	04:13:51.10535	2023-01-18 04:13:51.10535	0	1a64b1c5-f3a0-4b67-a4b6-93e709b1d09f	0	\N	70066149-c531-47a8-b99e-7cad054290b3	12000000	dokumen_validasi1674015230696KP-PERPUS.pdf	Riski Juliansyah	0121321321                          	081111111121    	PENS	curriculum_vitae1674015230697KP-KOODINATORl.pdf	\N	7
\.


--
-- Data for Name: instansi; Type: TABLE DATA; Schema: ref; Owner: postgres
--

COPY ref.instansi (id_instansi, nama, kode_instansi, alamat, kode_pos, website) FROM stdin;
d8ad6139-c954-457e-a937-a19772a55c5b	instansi	12345	alamat	40991  	website
\.


--
-- Name: jobdesk jobdesk_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jobdesk
    ADD CONSTRAINT jobdesk_pkey PRIMARY KEY (id_jobdesk);


--
-- Name: pengajuan pengajuan_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pengajuan
    ADD CONSTRAINT pengajuan_pkey PRIMARY KEY (id_pengajuan);


--
-- Name: instansi instansi_pkey; Type: CONSTRAINT; Schema: ref; Owner: postgres
--

ALTER TABLE ONLY ref.instansi
    ADD CONSTRAINT instansi_pkey PRIMARY KEY (id_instansi);


--
-- PostgreSQL database dump complete
--

