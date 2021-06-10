<package-info :package="package" showsbu2></package-info>

<script>
		new Vue({
		el: '#main',
		data: { package: {} },
		mounted: function () {
				this.getPackage('lvm2');
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

### Настройка ядра

Включите необходимые параметры в конфигурации ядра и пересоберите его:

```
Device Drivers --->
  [*] Multiple devices driver support (RAID and LVM) ---> [CONFIG_MD]
    <*/M>   Device mapper support                         [CONFIG_BLK_DEV_DM]
    <*/M>   Crypt target support                          [CONFIG_DM_CRYPT]
    <*/M>   Snapshot target                               [CONFIG_DM_SNAPSHOT]
    <*/M>   Thin provisioning target                      [CONFIG_DM_THIN_PROVISIONING]
    <*/M>   Mirror target                                 [CONFIG_DM_MIRROR]
Kernel hacking --->
  Generic Kernel Debugging Instruments --->
    [*] Magic SysRq key                                   [CONFIG_MAGIC_SYSRQ]
```

?> Помимо перечисленных ниже, в ядре есть несколько других опций Device Mapper. Чтобы получить нормальные результаты при запуске регрессивных тестов, все они должны быть включены либо внутри, либо как модуль. Если ключ `Magic SysRq` не включен, тесты будут проходить по тайм-ауту.

### Настройка lvm2

Подготовьте пакет к компиляции, выполнив:

 <package-script :package="'lvm2'" :type="'prepare'"></package-script>

## Сборка

<package-script :package="'lvm2'" :type="'build'"></package-script>

## Установка минимального набора утилит

Тесты используют `udev` для синхронизации логических томов, поэтому перед запуском тестов необходимо установить правила `LVM udev` и неоторые утилиты. Если вы собираете LVM2 впервые и не хотите устанавливать полный пакет перед запуском тестов, минимальный набор утилит можно установить, выполнив следующие действия:

```bash
make -C tools install_tools_dynamic &&
make -C udev  install &&
make -C libdm install
```

## Тестирование

<package-script :package="'lvm2'" :type="'test'"></package-script>

?> Опция `S=...` позволяет пропускать тесты. Известно, что тест `slell/thin-flags.sh` приводит к зависанию ПК. Время тестирования зависит от скорости диска и кол-ва включенных опций ядра.

Тесты не реализуют вероятность "ожидаемого сбоя", и вышестоящее подразделение ожидает небольшого кол-ва сбоев теста. Ещё больше сбоев может произойти из-за отсутствия некоторых параметров ядра. Например, отсутствие цели сопоставления устройства `dm-delay` может объяснить некоторые сбои. Часть тестов помечаются как "warned", если thin-provisioning-tools не установлены. Обходной путь - добавить следующие флаги для настройки:

```bash
     --with-thin-check=    \
     --with-thin-dump=     \
     --with-thin-repair=   \
     --with-thin-restore=  \
     --with-cache-check=   \
     --with-cache-dump=    \
     --with-cache-repair=  \
     --with-cache-restore= \
```

Некоторые тесты могут зависнуть. При необходимости их можно удалить, например:

```bash
rm test/shell/lvconvert-raid-reshare.sh
```

Тесты генерируют много сообщений ядра, которые могут мешать. Вы можете отключить их:

```bash
dmesg -D
```

!> Не забудьте ввести `dmesg -E` после завершения тестирования!

!> Проверки создают узлы устройств в директории `/tmp`. Тесты не пройдут, если `/tmp` смонтирован с параметром `nodev`.

## Установка

<package-script :package="'lvm2'" :type="'install'"></package-script>

## Объяснение новых команд

* `PATH=$PATH:/sbin:/usr/sbin`: добавляет `/sbin` и `/usr/sbin` в PATH для правильного обнаружения нужных иснтрументов скриптом `configure`.
* `--enable-cmdlib`: позволяет создавать общую библиотеку команд. Это требуется при создании демона событий.
* `--enable-pkgconfig`: позволяет установить файлы поддержки `pkg-config`.
* `--enable-udev_sync`: включает синхронизацию с обработкой Udev.
* `--enable-dmeventd`: этот ключ позволяет создавать демон событий Device Mapper.

## Установленные файлы
* **Установленные программы:** blkdeactivate, dmeventd (опционально), dmsetup, fsadm, lvm, и lvmdump.
* **Установленные библиотеки:** libdevmapper.so и liblvm2cmd.so; опциональные: libdevmapper-event.so, libdevmapper-event-lvm2.so, libdevmapper-event-lvm2mirror.so, libdevmapper-event-lvm2raid.so, libdevmapper-event-lvm2snapshot.so, и libdevmapper-event-lvm2thin.so
* **Установленные директории:** /etc/lvm и /lib-device-mapper (опционально)
