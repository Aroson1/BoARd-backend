--
-- PostgreSQL database dump
--

-- Dumped from database version 14.12 (Ubuntu 14.12-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.12 (Ubuntu 14.12-0ubuntu0.22.04.1)

-- Started on 2024-07-09 16:43:28 IST

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
-- TOC entry 3 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 3394 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 26467)
-- Name: BoardPositions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."BoardPositions" (
    id integer NOT NULL,
    position_number integer NOT NULL,
    description text NOT NULL,
    type character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."BoardPositions" OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 26466)
-- Name: BoardPositions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."BoardPositions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."BoardPositions_id_seq" OWNER TO postgres;

--
-- TOC entry 3395 (class 0 OID 0)
-- Dependencies: 215
-- Name: BoardPositions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."BoardPositions_id_seq" OWNED BY public."BoardPositions".id;


--
-- TOC entry 212 (class 1259 OID 26434)
-- Name: GameRooms; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."GameRooms" (
    id integer NOT NULL,
    room_name character varying(255) NOT NULL,
    room_description character varying(255),
    max_players integer DEFAULT 1 NOT NULL,
    room_host integer NOT NULL,
    game_status character varying(255) NOT NULL,
    active_player_ids integer[] DEFAULT ARRAY[]::integer[] NOT NULL,
    registered_player_ids integer[] NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."GameRooms" OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 26433)
-- Name: GameRooms_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."GameRooms_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."GameRooms_id_seq" OWNER TO postgres;

--
-- TOC entry 3396 (class 0 OID 0)
-- Dependencies: 211
-- Name: GameRooms_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."GameRooms_id_seq" OWNED BY public."GameRooms".id;


--
-- TOC entry 218 (class 1259 OID 26478)
-- Name: PlayerPositions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PlayerPositions" (
    id integer NOT NULL,
    player_id integer NOT NULL,
    room_id integer NOT NULL,
    current_position_number integer NOT NULL,
    token_number integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."PlayerPositions" OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 26477)
-- Name: PlayerPositions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."PlayerPositions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."PlayerPositions_id_seq" OWNER TO postgres;

--
-- TOC entry 3397 (class 0 OID 0)
-- Dependencies: 217
-- Name: PlayerPositions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."PlayerPositions_id_seq" OWNED BY public."PlayerPositions".id;


--
-- TOC entry 210 (class 1259 OID 18846)
-- Name: Players; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Players" (
    id integer NOT NULL,
    username character varying(255),
    password character varying(255),
    email character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Players" OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 18845)
-- Name: Players_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Players_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Players_id_seq" OWNER TO postgres;

--
-- TOC entry 3398 (class 0 OID 0)
-- Dependencies: 209
-- Name: Players_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Players_id_seq" OWNED BY public."Players".id;


--
-- TOC entry 214 (class 1259 OID 26450)
-- Name: QrCodes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."QrCodes" (
    id integer NOT NULL,
    code character varying(255),
    gameroom_id integer,
    created_by integer,
    expires_at timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."QrCodes" OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 26449)
-- Name: QrCodes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."QrCodes_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."QrCodes_id_seq" OWNER TO postgres;

--
-- TOC entry 3399 (class 0 OID 0)
-- Dependencies: 213
-- Name: QrCodes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."QrCodes_id_seq" OWNED BY public."QrCodes".id;


--
-- TOC entry 3230 (class 2604 OID 26470)
-- Name: BoardPositions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BoardPositions" ALTER COLUMN id SET DEFAULT nextval('public."BoardPositions_id_seq"'::regclass);


--
-- TOC entry 3226 (class 2604 OID 26437)
-- Name: GameRooms id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GameRooms" ALTER COLUMN id SET DEFAULT nextval('public."GameRooms_id_seq"'::regclass);


--
-- TOC entry 3231 (class 2604 OID 26481)
-- Name: PlayerPositions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PlayerPositions" ALTER COLUMN id SET DEFAULT nextval('public."PlayerPositions_id_seq"'::regclass);


--
-- TOC entry 3225 (class 2604 OID 18849)
-- Name: Players id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Players" ALTER COLUMN id SET DEFAULT nextval('public."Players_id_seq"'::regclass);


--
-- TOC entry 3229 (class 2604 OID 26453)
-- Name: QrCodes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."QrCodes" ALTER COLUMN id SET DEFAULT nextval('public."QrCodes_id_seq"'::regclass);


--
-- TOC entry 3239 (class 2606 OID 26474)
-- Name: BoardPositions BoardPositions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BoardPositions"
    ADD CONSTRAINT "BoardPositions_pkey" PRIMARY KEY (id);


--
-- TOC entry 3241 (class 2606 OID 26476)
-- Name: BoardPositions BoardPositions_position_number_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BoardPositions"
    ADD CONSTRAINT "BoardPositions_position_number_key" UNIQUE (position_number);


--
-- TOC entry 3235 (class 2606 OID 26443)
-- Name: GameRooms GameRooms_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GameRooms"
    ADD CONSTRAINT "GameRooms_pkey" PRIMARY KEY (id);


--
-- TOC entry 3243 (class 2606 OID 26483)
-- Name: PlayerPositions PlayerPositions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PlayerPositions"
    ADD CONSTRAINT "PlayerPositions_pkey" PRIMARY KEY (id);


--
-- TOC entry 3233 (class 2606 OID 18853)
-- Name: Players Players_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Players"
    ADD CONSTRAINT "Players_pkey" PRIMARY KEY (id);


--
-- TOC entry 3237 (class 2606 OID 26455)
-- Name: QrCodes QrCodes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."QrCodes"
    ADD CONSTRAINT "QrCodes_pkey" PRIMARY KEY (id);


--
-- TOC entry 3244 (class 2606 OID 26444)
-- Name: GameRooms GameRooms_room_host_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GameRooms"
    ADD CONSTRAINT "GameRooms_room_host_fkey" FOREIGN KEY (room_host) REFERENCES public."Players"(id);


--
-- TOC entry 3249 (class 2606 OID 26494)
-- Name: PlayerPositions PlayerPositions_current_position_number_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PlayerPositions"
    ADD CONSTRAINT "PlayerPositions_current_position_number_fkey" FOREIGN KEY (current_position_number) REFERENCES public."BoardPositions"(position_number);


--
-- TOC entry 3247 (class 2606 OID 26484)
-- Name: PlayerPositions PlayerPositions_player_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PlayerPositions"
    ADD CONSTRAINT "PlayerPositions_player_id_fkey" FOREIGN KEY (player_id) REFERENCES public."Players"(id);


--
-- TOC entry 3248 (class 2606 OID 26489)
-- Name: PlayerPositions PlayerPositions_room_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PlayerPositions"
    ADD CONSTRAINT "PlayerPositions_room_id_fkey" FOREIGN KEY (room_id) REFERENCES public."GameRooms"(id);


--
-- TOC entry 3246 (class 2606 OID 26461)
-- Name: QrCodes QrCodes_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."QrCodes"
    ADD CONSTRAINT "QrCodes_created_by_fkey" FOREIGN KEY (created_by) REFERENCES public."Players"(id);


--
-- TOC entry 3245 (class 2606 OID 26456)
-- Name: QrCodes QrCodes_gameroom_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."QrCodes"
    ADD CONSTRAINT "QrCodes_gameroom_id_fkey" FOREIGN KEY (gameroom_id) REFERENCES public."GameRooms"(id);


-- Completed on 2024-07-09 16:43:28 IST

--
-- PostgreSQL database dump complete
--
