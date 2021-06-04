<pkg :name="'xorgproto'" instsize showsbu2></pkg>

## Настройка
<package-script :package="'xorgproto'" :type="'configure'"></package-script>

### Объяснение параметров configure

``-Dlegacy=true`` Необходимо для некоторых очень старых программ

## Сборка
<package-script :package="'xorgproto'" :type="'build'"></package-script>

## Установка
<package-script :package="'xorgproto'" :type="'install'"></package-script>
 
## Установленные файлы
<package-script :package="'xorgproto'" :type="'files'"></package-script>

### Объяснение новых команд и значений

* `install -vm 644 ../[^m]*.txt ../PM_spec $XORG_PREFIX/share/doc/xorgproto-2020.1` - Устанавливает документацию. Часть `[^m]` предотвращает копирование `meson_options.txt`

<script>
	new Vue({ el: '#main' })
</script> 
