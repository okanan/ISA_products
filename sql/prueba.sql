-- create database

CREATE DATABASE prueba

-- public.productos definition

-- Drop table

-- DROP TABLE public.productos;

CREATE TABLE public.productos (
	idproducto serial4 NOT NULL,
	nombre varchar NOT NULL,
	"text" text NOT NULL,
	precio float8 NOT NULL,
	CONSTRAINT productos_pk PRIMARY KEY (idproducto)
);

-- public.detalleproductos definition

-- Drop table

-- DROP TABLE public.detalleproductos;

CREATE TABLE public.detalleproductos (
	iddetalleproducto serial4 NOT NULL,
	idproducto int4 NOT NULL,
	cantidad int4 NOT NULL,
	valortotal float8 NOT NULL,
	valoriva float8 NOT NULL,
	CONSTRAINT detalleproductos_pk PRIMARY KEY (iddetalleproducto)
);


-- public.detalleproductos foreign keys

ALTER TABLE public.detalleproductos ADD CONSTRAINT detalleproductos_fk FOREIGN KEY (idproducto) REFERENCES public.productos(idproducto);