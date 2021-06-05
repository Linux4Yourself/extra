<pkg :name="'libxml2'" instsize showsbu></pkg>

## Настройка
<package-script :package="'libxml2'" :type="'configure'"></package-script>

### Объяснение параметров configure

`--with-history` - Использовать библиотеку Readline

`--with-python=/usr/bin/python3` - Использовать Python3 вместо Python2

`--with-threads` - Включает поддержку много поточности

### Дополнительные параметры configure

`--with-icu` - Использовать библиотеку ICU.

## Сборка
<package-script :package="'libxml2'" :type="'build'"></package-script>

## Установка
<package-script :package="'libxml2'" :type="'install'"></package-script>
 
## Для multilib

## Настройка
<package-script :package="'libxml2'" :type="'multi-configure'"></package-script>

## Сборка
<package-script :package="'libxml2'" :type="'multi-build'"></package-script>

## Установка
<package-script :package="'libxml2'" :type="'multi-install'"></package-script>
 

## Установленные файлы

Программы: xml2-config, xmlcatalog и xmllint

Библиотеки: libxml.so и libxml2mod.so (Модуль python)

Директории: /usr/include/libxml2 и /usr/lib/cmake/libxml2

<script>
	new Vue({ el: '#main' })
</script> 
