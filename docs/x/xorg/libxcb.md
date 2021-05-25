<package-info :package="package" showsbu2></package-info>

<script>
		new Vue({
		el: '#main',
		data: { package: {} },
		mounted: function () {
				this.getPackage('libxcb');
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
CFLAGS="${CFLAGS:--O3 -s} -Wno-error=format-extra-args" ./configure $XORG_CONFIG \
            --without-doxygen 
```

## Сборка

```bash
make
```

## Тестирование

```bash
make check
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
CC="gcc -m32" CXX="g++ -m32" CFLAGS="${CFLAGS:--O3 -s} -Wno-error=format-extra-args" \
./configure                      \
     $XORG_CONFIG                 \
    --libdir=$XORG_PREFIX/lib32   \
    --host=i686-pc-linux-gnu --without-doxygen
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
* **Установленные библиотеки:** libxcb.so, libxcb-composite.so, libxcb-damage.so, libxcb-dpms.so, libxcb-dri2.so, libxcb-dri3.so, libxcb-glx.so, libxcb-present.so, libxcb-randr.so, libxcb-record.so, libxcb-render.so, libxcb-res.so, libxcb-screensaver.so, libxcb-shape.so, libxcb-shm.so, libxcb-sync.so, libxcb-xf86dri.so, libxcb-xfixes.so, libxcb-xinerama.so, libxcb-xinput.so, libxcb-xkb.so, libxcb-xtest.so, libxcb-xvmc.so, и libxcb-xv.so
* **Установленные директории:** `$XORG_PREFIX/include/xcb` и `$XORG_PREFIX/share/doc/libxcb-1.14`
