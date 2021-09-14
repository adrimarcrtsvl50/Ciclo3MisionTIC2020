-- Tabla bicileta
create table bicicleta
(
    serial text not null
        constraint bicicleta_pk
            primary key,
    marca  text not null,
    tipo   text not null,
    tamano text not null,
    genero text not null,
    color  text not null,
    estado text not null,
    modelo text not null
);

alter table bicicleta
    owner to postgres;

-- Tabla caja
create table caja
(
    pos      integer          not null
        constraint caja_pk
            primary key,
    subtotal double precision not null,
    total    double precision,
    iva      double precision
);

alter table caja
    owner to postgres;

-- Tabla calendario
create table calendario
(
    id_calendar   serial
        constraint calendario_pk
            primary key,
    fecha_inicio  date not null,
    fecha_fin     date,
    fecha_entrega date
);

alter table calendario
    owner to postgres;

-- Tabla perfil
create table perfil
(
    cedula           integer not null
        constraint perfil_pk
            primary key,
    nombre           text    not null,
    apellido         text    not null,
    fecha_nacimiento date    not null,
    tipo_usuario     text    not null
);

alter table perfil
    owner to postgres;
