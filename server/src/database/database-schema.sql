--
-- PostgreSQL database dump
--

-- Dumped from database version 12.4 (Debian 12.4-1.pgdg100+1)
-- Dumped by pg_dump version 12.4 (Debian 12.4-1.pgdg100+1)

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
-- Name: user_data_text_search_trigger(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.user_data_text_search_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin
 new.tsv_user_data_text := to_tsvector(coalesce(name, '')) || to_tsvector(coalesce(email, '')) || to_tsvector(coalesce(bio, ''));
 return new;
end
$$;


ALTER FUNCTION public.user_data_text_search_trigger() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(200) NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    bio character varying(600),
    image character varying(200),
    tsv_user_data_text tsvector
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: users PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- Name: tsv_user_data_text_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX tsv_user_data_text_idx ON public.users USING gin (tsv_user_data_text);


--
-- Name: users tsvector_user_data_text_update; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER tsvector_user_data_text_update BEFORE INSERT OR UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.user_data_text_search_trigger();


--
-- PostgreSQL database dump complete
--

