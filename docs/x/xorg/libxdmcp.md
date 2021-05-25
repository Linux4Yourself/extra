<package-info :package="package" showsbu2></package-info>

<script>
		new Vue({
		el: '#main',
		data: { package: {} },
		mounted: function () {
				this.getPackage('libxdmcp');
		},
		methods: {
			getPackage: function(name) {
					getPackage(name)
					.then(response => this.package = response);
			},
		}
  })
</script>

## Настройка

```bash
./configure $XORG_CONFIG
```

## Сборка

```bash
make
```

## Установка

```bash
make install
```

## Для multilib

### Очистка

```bash
make distclean
```

### Настройка

```bash
CC="gcc -m32" CXX="g++ -m32" ./configure \
    $XORG_CONFIG      \
    --libdir=$XORG_PREFIX/lib32   \
    --host=i686-pc-linux-gnu
```

### Сборка 

```bash
make
```

### Установка

```bash
make DESTDIR=$PWD/DESTDIR install
cp -Rv DESTDIR/$XORG_PREFIX/lib32/* $XORG_PREFIX/lib32
rm -rf DESTDIR
```

## Установленные файлы
* **Установленные программы:** нет
* **Установленные библиотеки:** libXdmcp.so
* **Установленные директории:** `$XORG_PREFIX/share/doc/libXdmcp`
