-- Tabla tarjetas
create table tarjetas
(
    id             integer default nextval('enbike.table_name_id_seq'::regclass) not null
        constraint table_name_pk
            primary key,
    nombre         text                                                          not null,
    numero_tarjeta text                                                          not null,
    vencimiento    text                                                          not null,
    cvv            text                                                          not null
);

alter table tarjetas
    owner to postgres;

create unique index table_name_id_uindex
    on tarjetas (id);

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

-- Tabla pos (Point of Sale)
create table pos
(
    id_venta      integer          not null
        constraint id_venta_pk
            primary key,
    subtotal double precision not null,
    multa    double precision,
    iva      double precision not null,
    total    double precision not null
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

-- Tabla de direcciones de facturacion
    create table direccion_facturacion
    (
        id           serial
            constraint direccion_facturacion_pk
                primary key,
        nombre       text not null,
        email        text not null,
        direccion    text not null,
        ciudad       text not null,
        telefono     text not null,
        departamento text not null
    );

    alter table direccion_facturacion
        owner to postgres;

    create unique index direccion_facturacion_id_uindex
        on direccion_facturacion (id);