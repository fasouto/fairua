"""
Copy the contents of .build to /build in order to be used with github pages
Adapted from https://gist.github.com/moomoohk/f3b114c392aae03f0cd2
"""

import distutils.dir_util
import shutil
import os
 
def copytree(src, dst):
    for item in os.listdir(src):
        s, d = os.path.join(src, item), os.path.join(dst, item)
        if os.path.isdir(s):
            shutil.copytree(s, d, False, None)
        else:
            shutil.copy2(s, d)
 
def postBuild(site):
    build_folder = os.path.join(site.path, "build")
 
    for sub_file in os.listdir(build_folder):
        if sub_file[0] != ".":
            sub_file_path = os.path.join(build_folder, sub_file)
            try:
                if os.path.isfile(sub_file_path):
                    os.unlink(sub_file_path)
                elif os.path.isdir(sub_file_path):
                    shutil.rmtree(sub_file_path)
            except Exception, e:
                print e
 
    copytree(site.paths['build'], build_folder)