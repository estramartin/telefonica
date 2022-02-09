
select * from linea_equipo_plan

select c.*, l.* from clientes c
join linea_equipo_plan l on (c.lista_l_e_p = l.linea)


create or replace function sp_cargar_datos() returns void as
$$
begin

insert into planes values
('Light', 100 , 2000, 2, 'prepago', 300 ),
('Standar', 200 , 4000, 4, 'prepago', 500 ),
('Max', 400 , 5000, 6, 'prepago', 700 ),
('ahorro', 50, 1000, 1, 'tarjeta', 200);

insert into equipo (marca, modelo, fecha_ingreso, estado) values
('Samsung', 'Note 8', current_date, 'preventa'),
('Samsung', 'A52', current_date, 'vendido'),
('Motorola', 'G60s', current_date, 'en sucursal'),
('Motorola', 'G100', current_date, 'descompuesto'),
('Xiaomi', 'Redmin 9', current_date, 'preventa'),
('Nokia', '1100', current_date, 'vendido');


insert into linea values
(3434636603,'activada' ),
(3434636604,'activada' ),
(3434636605,'activada' ),
(3434636606,'activada' ),
(3434636607,'activada' ),
(3434636608,'activada' ),
(3434636609,'activada' ),
(543434636610,'activada' ),
(3434636602,'activada' ),
(543434636611,'pendiente' ),
(543434636612,'bloqueada' ),
(543434636613,'pendiente' ),
(543434636614,'bloqueada' ),
(543434636615,'pendiente' ),
(543434636616,'activada' ),
(543434636617,'bloqueada' ),
(543434636618,'activada' );

insert into linea_equipo_plan values
(3434636603,1, 'Light', current_date, null, 300 ),
(3434636604,2, 'Standar',current_date, null , 500),
(3434636605,3, 'Max',current_date, null, 700),
(3434636606,4,  'Light', current_date, '21-02-23',300),
(3434636607,5, 'Max' ,current_date,'22-07-23',700),
(3434636608,6, 'ahorro',current_date,'13-05-23',200);



insert into clientes values
('Estrada Martin', 'Alsina 869', 'Masculino', 35, 3434636603,3434636603 );


end;
$$
language 'plpgsql'